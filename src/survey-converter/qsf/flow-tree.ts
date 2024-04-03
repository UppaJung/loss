import type { SurveyQuestion, SurveyBlockPayloadEntry, Flow, QuestionId, BlockId } from "./types.ts";
import { isNonNull } from "./type-guards.ts";
import { AugmentedSurveyQuestion, augmentSurveyQuestion } from "./augmented-survey-question.ts";


export type FlowType = Exclude<Flow["Type"], "Standard"> | "Block";

export interface LeafFlowNode {
  type: "Block";
  description: string;
  questions: AugmentedSurveyQuestion[];
}

export interface ParentFlowNode {
  type: Exclude<FlowType, "Block" | "Root">;
  children: FlowNode[];
}

export interface RootFlowNode {
  type: "Root";
  children: (ParentFlowNode | LeafFlowNode)[];
}

export type FlowNode = LeafFlowNode | ParentFlowNode | RootFlowNode;

export const getFlowTree = (rootFlow: Flow, questionsById: Map<QuestionId, SurveyQuestion>, blocksById: Map<BlockId, SurveyBlockPayloadEntry>): RootFlowNode => {

  const getFlowTreeNode = (flow: Flow): ParentFlowNode | LeafFlowNode | undefined => {
    if (flow.Type === "Standard" && flow.ID != null) {
      const block = blocksById.get(flow.ID);
      if (block == null) {
        console.warn(`Block with ID ${flow.ID} not found`);
        return;
      }
      const questions = block.BlockElements
        .filter(element => element.Type === "Question" && element.QuestionID != null && questionsById.has(element.QuestionID))
        .map(element => augmentSurveyQuestion(element, questionsById.get(element.QuestionID!)!));
      return {
        type: "Block",
        description: block.Description,
        questions
      } satisfies LeafFlowNode;
    } else if (flow.Type === "BlockRandomizer" || flow.Type === "Group") {
      const subFlows = flow.Flow == null ? [] : Array.isArray(flow.Flow) ? flow.Flow : [flow.Flow];
      const children = subFlows.map( subFlow => getFlowTreeNode(subFlow) ).filter(isNonNull);
      return {
        type: flow.Type,
        children
      } satisfies ParentFlowNode;
    } else {
      console.warn(`Unexpected flow type ${flow.Type}`);
      return undefined;
    }
  };
  if (rootFlow.Type !== "Root") {
    throw new Error("getFlowTree called with non-root flow");
  }
  const {Flow} = rootFlow;
  const subFlows = Flow == null ? [] : Array.isArray(Flow) ? Flow : [Flow];
  const children = subFlows.map( subFlow => getFlowTreeNode(subFlow) ).filter(isNonNull);
  return {
    type: "Root",
    children
  } satisfies RootFlowNode;  
}