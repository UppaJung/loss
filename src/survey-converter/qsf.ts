import { SurveyRoot, SurveyQuestion, QuestionId } from "./qsf/types.ts";
import { isSurveyBlock, isSurveyFlow, isSurveyQuestion } from "./qsf/type-guards.ts";
import { AugmentedSurveyQuestion } from "./qsf/augmented-survey-question.ts";
import { FlowNode, getFlowTree } from "./qsf/flow-tree.ts";
import { toHtml } from "./qsf/to-html.ts";

const getSortedQuestions = (
  flowTree: FlowNode[] | FlowNode
): AugmentedSurveyQuestion[] => {
  if (Array.isArray(flowTree)) {
    return flowTree.flatMap(getSortedQuestions);
  } else {
    return flowTree.type === "Block" ? flowTree.questions : flowTree.children.flatMap(getSortedQuestions);
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
	const [rootFlow] = qsfObject.SurveyElements.filter(isSurveyFlow).filter(f => f.Payload.Type === "Root");
  const flowTree = getFlowTree(rootFlow.Payload, questionsById, blocksById);
  const questionsInFlowOrder = getSortedQuestions(flowTree);
  return {qsfObject, questions, blocks, rootFlow, questionsById, blocksById, flowTree, questionsInFlowOrder};
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
	const {questions, blocks, rootFlow, flowTree, questionsInFlowOrder} = parseQsf("./src/survey-converter/loss.qsf");
	Deno.mkdirSync("./src/survey-converter/out", {recursive: true});
	Deno.writeTextFileSync("./src/survey-converter/out/questions-ordered.json",
		JSON.stringify(questionsInFlowOrder, null, "\t")
	);
  Deno.writeTextFileSync("./survey.vto",
    defaultHeader + toHtml(flowTree)
      .replaceAll("$\{q:\/\/QID2\/ChoiceTextEntryValue\}", '<i>participant\'s top harm</i>')
      .replaceAll("$\{q:\/\/QID5\/ChoiceTextEntryValue\}", '<i>participant\'s second harm</i>')
      .replaceAll("$\{q:\/\/QID6\/ChoiceTextEntryValue\}", '<i>participant\'s third harm</i>')

  );
	Deno.writeTextFileSync("./src/survey-converter/out/known.json",
		JSON.stringify({questions, blocks, rootFlow}, null, "\t")
	);

}
parse();