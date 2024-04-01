import { SurveyRoot, Choice, SurveyQuestion, SurveyBlockPayloadEntry, Flow, SurveyFlow, SurveyQuestionPayload, QuestionId, BlockId } from "./types.d.ts";
import { isSurveyBlock, isSurveyFlow, isSurveyQuestion } from "./type-guards.ts";

export type FlowType = Exclude<Flow["Type"], "Standard" | "Root"> | "Block";

export interface AugmentedSurveyQuestion extends SurveyQuestion {
  skipToEndOfBlockIfChoices?: Choice[];
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
          const skipToEndOfBlockIfChoices = (SkipLogic == null) ? [] :
            SkipLogic.map( skipLogic => {
              if (skipLogic.SkipToDestination === "ENDOFBLOCK" && skipLogic.QuestionID == question.Payload.QuestionID && skipLogic.Condition === "Selected" ) {
                const option = (skipLogic.Locator.split("/").pop() ?? "") as `${number}`;
                return question.Payload.Choices?.[option];
              }
            }).filter( x => x != null) as Choice[]
					return {...question, skipToEndOfBlockIfChoices};
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

const choicesToMarkdown = ({Choices, ChoiceOrder}: SurveyQuestionPayload) => {
	if (Choices == null) {
		return "";
	}
	const choiceObjects = ChoiceOrder == null ? Object.values(Choices) :
		ChoiceOrder.map( index => Choices[`${index}`]);
	const choiceStrings = choiceObjects.map( (choice) => choice.Display );
	if (choiceStrings.length === 7 &&
		choiceStrings.filter( (s, index) => s == (index+1).toString()).length === 7) {
			const spaces5 = "&nbsp;&nbsp;&nbsp;&nbsp;";
		return `\n${spaces5}${spaces5} [ 1 ]${spaces5}[ 2 ]${spaces5}[ 3 ]${spaces5}[ 4 ]${spaces5}[ 5 ]${spaces5}[ 6 ]${spaces5}[ 7 ]&nbsp;&nbsp;&nbsp;`;
	}
	const choiceLines = '\n\n  - ' + choiceStrings.join('\n  - ');
	return choiceLines;
}


const html = String.raw;
const htmlEncode = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const questionsToMd = (questions: AugmentedSurveyQuestion[]) => questions.map( q => {
	const p = q.Payload;
  const skip = (q.skipToEndOfBlockIfChoices == null || q.skipToEndOfBlockIfChoices.length === 0) ? "" :
    `\n\nSkip to end of block if participant selects ${
      q.skipToEndOfBlockIfChoices.map( c => `\`${htmlEncode(c.Display)}\``).join(", ")
    }`;
  return `${p.QuestionText}${choicesToMarkdown(p)}${skip}`;
}).join("\n\n");


const choicesToHtml = ({Choices, ChoiceOrder}: SurveyQuestionPayload, lineSep: string) => {
	if (Choices == null) {
		return "";
	}
	const choiceObjects = ChoiceOrder == null ? Object.values(Choices) :
		ChoiceOrder.map( index => Choices[`${index}`]);
	const choiceStrings = choiceObjects.map( (choice) => choice.Display );
  const likert = (choiceStrings.length === 7 &&
		choiceStrings.filter( (s, index) => s == (index+1).toString()).length === 7);
	const choiceLines = html`${lineSep
    }<ul class="${likert ? 'choices-likert' : 'choices'}">${
    choiceStrings.map( choice =>
      html`${lineSep + "\t"
        }<li class="${likert ? 'choice-likert' : 'choice'}">${htmlEncode(choice)}</li>`
    ).join("")
  }${lineSep}</ul>`;
	return choiceLines;
}

const questionsToHtml = (flowOrFlows: FlowNode | FlowNode[], lineSep: string = "\n"): string => {
  if (Array.isArray(flowOrFlows)) {
    return flowOrFlows.map ( flow => questionsToHtml(flow, lineSep)).join("");
  }
  const flow = flowOrFlows;
  if (flow.type === "BlockRandomizer" || flow.type === "Group") {
    return `${lineSep}<div class="${flow.type}">${lineSep + "\t"
     }<div class="block-header">${
      flow.type === "BlockRandomizer" ?
        "Randomize ordering" :
        "Group"
     }</div>${
      questionsToHtml(flow.children, lineSep + "\t")
    }${lineSep}</div>`;
  } else if (flow.type === "Block") {
    return html`${lineSep}<div class="${flow.type}">${lineSep + "\t"
  }<div class="block-header">Block</div>${
      flow.questions.map( q => {
        const p = q.Payload;
        const skip = (q.skipToEndOfBlockIfChoices == null || q.skipToEndOfBlockIfChoices.length === 0) ? "" :
          html`${lineSep + "\t"}<div class="note">Skip to end of block if participant selects ${
            q.skipToEndOfBlockIfChoices.map( c => `<span class="skip-option">${htmlEncode(c.Display)}</span>`).join(", ")
          }</div>`;
        return html`${lineSep + "\t"}<div class="question">${
          lineSep + "\t\t"}<div class="question-body">${
          p.QuestionText}${choicesToHtml(p, lineSep + "\t\t\t")
        }${lineSep + "\t\t"}</div>${
        lineSep + "\t"}</div>${skip}`;
      }).join("")
    }${lineSep}</div>`;
  } else {
    return "";
  }
}

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
	Deno.writeTextFileSync("./questions-ordered.md",
		questionsToMd(questionsInFlowOrder)
	);
  Deno.writeTextFileSync("./survey.vto",
    defaultHeader + questionsToHtml(flowTree)
      .replaceAll("$\{q:\/\/QID2\/ChoiceTextEntryValue\}", '<i>participant\'s top harm</i>')
      .replaceAll("$\{q:\/\/QID5\/ChoiceTextEntryValue\}", '<i>participant\'s second harm</i>')
      .replaceAll("$\{q:\/\/QID6\/ChoiceTextEntryValue\}", '<i>participant\'s third harm</i>')

  );
	Deno.writeTextFileSync("./src/survey-converter/out/known.json",
		JSON.stringify({questions, blocks, flows}, null, "\t")
	);

}
parse();