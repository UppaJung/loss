import { SurveyRoot, Choice, SurveyQuestion, SurveyBlockPayloadEntry, Flow, SurveyQuestionPayload, QuestionId, BlockId } from "./types.d.ts";
import { isSurveyBlock, isSurveyFlow, isSurveyQuestion } from "./type-guards.ts";

export type FlowType = Exclude<Flow["Type"], "Standard" | "Root"> | "Block";

export interface AugmentedSurveyQuestion extends SurveyQuestion {
  skipToEndOfBlockIfChoices?: Choice[];
  isLikert7: boolean;
}

export interface LeafFlowNode {
  type: "Block";
  description: string;
  questions: AugmentedSurveyQuestion[];
}

export interface ParentFlowNode {
  type: Exclude<FlowType, "Block">;
  children: FlowNode[];
}

export type FlowNode = LeafFlowNode | ParentFlowNode;

const getFlowTree = (
	flowOrFlows: Flow[] | Flow | undefined,
	questionsById: Map<QuestionId, SurveyQuestion>,
	blocksById: Map<BlockId, SurveyBlockPayloadEntry>,	
): FlowNode[] => {
  if (flowOrFlows == null) {
    return [];
  }
  const flows = Array.isArray(flowOrFlows) ? flowOrFlows : [flowOrFlows];
  if (flows.length === 1 && flows[0].Type === "Root") {
    // The root node alone should be skipped and replaced by its children
    const [rootFlow] = flows;
    const flowsBelowRoot = rootFlow.Flow == null ? [] : Array.isArray(rootFlow.Flow) ? rootFlow.Flow : [rootFlow.Flow];
    return getFlowTree(flowsBelowRoot, questionsById, blocksById);
  }
	return ((flows.map( (flow): FlowNode | null => {
		if (flow.Type === "Standard" && flow.ID != null) {
			const block = blocksById.get(flow.ID);
			if (block == null) {
				console.warn(`Block with ID ${flow.ID} not found`);
				return null;
			}
			const questions = block.BlockElements
				.filter( element => element.Type === "Question")
				.map( element => {
          const {SkipLogic, QuestionID} = element;
					const question = QuestionID == null ? undefined : questionsById.get(QuestionID);
					if (question == null) {
						console.warn(`Question with ID ${element.QuestionID} not found`);
						return;
					}
          const {Payload} = question;
          const {Choices} = Payload;
          const isLikert7 = (Choices != null && Object.values(Choices).length == 7 &&
            Object.values(Choices).map( c => c.Display ).sort().filter( (s, index) => s == (index+1).toString()).length === 7);
          const skipToEndOfBlockIfChoices = (SkipLogic == null) ? [] :
            SkipLogic.map( skipLogic => {
              if (skipLogic.SkipToDestination === "ENDOFBLOCK" && skipLogic.QuestionID == Payload.QuestionID && skipLogic.Condition === "Selected" ) {
                const option = (skipLogic.Locator.split("/").pop() ?? "") as `${number}`;
                return Choices?.[option];
              }
            }).filter( x => x != null) as Choice[]
					return {...question, isLikert7, skipToEndOfBlockIfChoices};
				})
				.filter( (question) => question != null) as AugmentedSurveyQuestion[];
			return {
        type: "Block",
        description: block.Description,
        questions
      } satisfies LeafFlowNode;
		} else if (flow.Type === "BlockRandomizer" || flow.Type === "Group") {
			const sf = flow.Flow;
			const subFlows = sf == null ? [] : Array.isArray(sf) ? sf : [sf];
 			const children = getFlowTree(subFlows, questionsById, blocksById);
       return {
        type: flow.Type,
        children
      } satisfies ParentFlowNode;
		} else {
      console.warn(`Unexpected flow type ${flow.Type}`);
      return null;
    }
	}) satisfies (FlowNode | null)[])
  .filter( x => x != null ) as FlowNode[]);
}

const getSortedQuestions = (
  flowTree: FlowNode[] | FlowNode
): AugmentedSurveyQuestion[] => {
  if (Array.isArray(flowTree)) {
    return flowTree.flatMap(getSortedQuestions);
  } else {
    return flowTree.type === "Block" ? flowTree.questions : flowTree.children.flatMap(getSortedQuestions);
  }
}

const htmlEncode = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");


// const choicesToMarkdown = ({Choices, ChoiceOrder}: SurveyQuestionPayload) => {
// 	if (Choices == null) {
// 		return "";
// 	}
// 	const choiceObjects = ChoiceOrder == null ? Object.values(Choices) :
// 		ChoiceOrder.map( index => Choices[`${index}`]);
// 	const choiceStrings = choiceObjects.map( (choice) => choice.Display );
// 	if (choiceStrings.length === 7 &&
// 		choiceStrings.filter( (s, index) => s == (index+1).toString()).length === 7) {
// 			const spaces5 = "&nbsp;&nbsp;&nbsp;&nbsp;";
// 		return `\n${spaces5}${spaces5} [ 1 ]${spaces5}[ 2 ]${spaces5}[ 3 ]${spaces5}[ 4 ]${spaces5}[ 5 ]${spaces5}[ 6 ]${spaces5}[ 7 ]&nbsp;&nbsp;&nbsp;`;
// 	}
// 	const choiceLines = '\n\n  - ' + choiceStrings.join('\n  - ');
// 	return choiceLines;
// }


// const questionsToMd = (questions: AugmentedSurveyQuestion[]) => questions.map( q => {
// 	const p = q.Payload;
//   const skip = (q.skipToEndOfBlockIfChoices == null || q.skipToEndOfBlockIfChoices.length === 0) ? "" :
//     `\n\nSkip to end of block if participant selects ${
//       q.skipToEndOfBlockIfChoices.map( c => `\`${htmlEncode(c.Display)}\``).join(", ")
//     }`;
//   return `${p.QuestionText}${choicesToMarkdown(p)}${skip}`;
// }).join("\n\n");


export const surveyFormatterFactory = (callbacks: {
  onBlockRandomizer: (args: {depth: number, children: string[]}) => string,
  onGroup: (args: {depth: number, children: string[]}) => string,
  onBlock: (args: {depth: number, description: string, children: string[]}) => string,
  onQuestion: (args: {depth: number, children: string[], questionText: string, raw: AugmentedSurveyQuestion}) => string,
  onChoice: (args: {depthOfQuestion: number, choiceString: string, choiceIndex: number, choice: Choice, allChoices: Choice[]}) => string,
}) => {
  const recursive = (flowNode: FlowNode, depth: number): string => {
    if (flowNode.type === "BlockRandomizer") {
      const children = flowNode.children.map( child => recursive(child, depth + 1));
      return callbacks.onBlockRandomizer({depth, children});
    } else if (flowNode.type === "Group") {
      const children = flowNode.children.map( child => recursive(child, depth + 1));
      return callbacks.onGroup({depth, children});
    } else if (flowNode.type === "Block") {
      const children = flowNode.questions.map( q => {
        const {QuestionText: questionText, Choices, ChoiceOrder } = q.Payload;
        const choiceObjects = Choices == null ? [] :
          ChoiceOrder == null ? Object.values(Choices ?? []) :
          ChoiceOrder.map( index => Choices[`${index}`]);
        const children = choiceObjects.map( (choice, choiceIndex) => 
          callbacks.onChoice({depthOfQuestion: depth + 1, choiceString: choice.Display, choiceIndex, choice, allChoices: choiceObjects}));
        return callbacks.onQuestion({depth: depth + 1, questionText, children, raw: q});
      });
      return callbacks.onBlock({depth, description: flowNode.description, children})
    } else {
      return "";
    }
  }
  return (flowNodeOrNodes: FlowNode | FlowNode[]) => {
    if (Array.isArray(flowNodeOrNodes)) {
      return recursive({type: "Group", children: flowNodeOrNodes}, 0);
    } else {
      return recursive(flowNodeOrNodes, 0);
    }
  }
}

const depthToTabs = (depth: number) => "\t".repeat(depth);

const tag = (
  tagName: string,
  {depth, class: classes, singleLine=false}: {depth: number, class?: string | string[], singleLine?: boolean},
  ...content: string[]
) => {
  const openTag = `<${tagName}${classes == null ? "" : ` class="${Array.isArray(classes) ? classes.join(" ") : classes}"`}>`;
  const closeTag = `</${tagName}>`;
  if (singleLine) {
    return `${depthToTabs(depth)}${openTag}${content.join("")}${closeTag}${"\n"}`;
  } else {
    return `${depthToTabs(depth)}${openTag}${"\n"}${content.join("")}${"\n"}${depthToTabs(depth)}${closeTag}${"\n"}`;
  }
}

const htmlFormatter = surveyFormatterFactory({
  onBlockRandomizer: ({depth, children}) =>
    tag("div", {class: "BlockRandomizer", depth}, 
      tag("div", {class: "block-header", depth: depth + 1, singleLine: true}, "Randomize"),
      children.join("")
    ),
  onGroup: ({depth, children}) => 
    tag("div", {class: "Group", depth}, 
      tag("div", {class: "block-header", depth: depth + 1, singleLine: true}, "Group"),
      children.join("")
    ),
  onBlock: ({depth, description, children}) =>
      tag("div", {class: "Block", depth}, 
        tag("div", {class: "block-header", depth: depth + 1, singleLine: true}, `Block: ${htmlEncode(description)} (block names not exposed to participants)`),
        children.join("")
    ),
  onChoice: ({depthOfQuestion, choiceString}) =>
    tag('li', {class: "choice", depth: depthOfQuestion + 2, singleLine: true}, htmlEncode(choiceString)),
  onQuestion: ({depth, questionText, children, raw}) => {
    const {skipToEndOfBlockIfChoices, isLikert7} = raw;
    const classes = ["question", ...(isLikert7 ? ["likert"] : [])];
    return tag("div", {depth, class: classes}, 
      tag("div", {class: "question-body", depth: depth + 1, singleLine: true}, questionText),
      children.length == 0 ? "" : tag("ul", {class: "choices", depth: depth + 1}, ...children),
      (skipToEndOfBlockIfChoices == null || skipToEndOfBlockIfChoices.length === 0) ? "" :
        tag("div", {depth, class: "note", singleLine: true},
          `Skip to end of block if participant selects `,
          skipToEndOfBlockIfChoices.map( c =>
              tag("span", {class: "skip-option", depth: depth + 1, singleLine: true}, htmlEncode(c.Display))
          ).join(", ")
       )
    );
    // ) html`${depthToTabs(depth)}<div class="question${isLikert7 ? ' likert' : ''}">${"\n"}${depthToTabs(depth + 1)
    //   }<div class="question-body">${"\n"}${depthToTabs(depth + 2)
    //     }${questionText}${"\n"}${depthToTabs(depth + 1)
    //     }</div>${"\n"}${children.length == 0 ? "" :  `${depthToTabs(depth + 1)
    //       }<ul class="choices">${"\n" + children.join("") + depthToTabs(depth + 1)}</ul>${"\n"}`
    //     }${skip}${depthToTabs(depth)
    //  }</div>${"\n"}`;
  },
})
const parseQsf = (path: string) => {
  const json = Deno.readTextFileSync(path);
	const qsfObject = JSON.parse(json) as SurveyRoot;
	const questions = qsfObject.SurveyElements.filter(isSurveyQuestion);
	const questionsById = new Map<QuestionId, SurveyQuestion>(
		questions.map((question) => [question.Payload.QuestionID, question])	
	);
	const blocks = qsfObject.SurveyElements.filter(isSurveyBlock);
	const blocksById = new Map(
		blocks.map((block) => 
			Object.values(block.Payload).map( element => [element.ID, element] as const)
		).flat()
	);
	const flows = qsfObject.SurveyElements.filter(isSurveyFlow);
  const flowTree = getFlowTree(flows[0].Payload.Flow, questionsById, blocksById);
  const questionsInFlowOrder = getSortedQuestions(flowTree);
  return {qsfObject, questions, blocks, flows, questionsById, blocksById, flowTree, questionsInFlowOrder};
}

const defaultHeader = `---
title: Survey Instrument
type: supplement
layout: layouts/survey.vto
templateEngine: [vto]
date: Git Last Modified
---
`
const parse = () => {
	const {questions, blocks, flows, flowTree, questionsInFlowOrder} = parseQsf("./src/survey-converter/loss.qsf");
	Deno.mkdirSync("./src/survey-converter/out", {recursive: true});
	Deno.writeTextFileSync("./src/survey-converter/out/questions-ordered.json",
		JSON.stringify(questionsInFlowOrder, null, "\t")
	);
  Deno.writeTextFileSync("./survey.vto",
    defaultHeader + htmlFormatter(flowTree)
      .replaceAll("$\{q:\/\/QID2\/ChoiceTextEntryValue\}", '<i>participant\'s top harm</i>')
      .replaceAll("$\{q:\/\/QID5\/ChoiceTextEntryValue\}", '<i>participant\'s second harm</i>')
      .replaceAll("$\{q:\/\/QID6\/ChoiceTextEntryValue\}", '<i>participant\'s third harm</i>')

  );
	Deno.writeTextFileSync("./src/survey-converter/out/known.json",
		JSON.stringify({questions, blocks, flows}, null, "\t")
	);

}
parse();