import { Choice } from "./types.ts";
import { AugmentedSurveyQuestion } from "./augmented-survey-question.ts";
import { FlowNode } from "./flow-tree.ts";
import { isNonNull } from "./type-guards.ts";


export const surveyFormatterFactory = <R = string, RCHOICE = string, RQUESTION = string, RRECURSIVE = string>(callbacks: {
  onChoice: (args: { depthOfQuestion: number; choiceString: string; choiceIndex: number; choice: Choice; allChoices: Choice[]; }) => RCHOICE;
  onQuestion: (args: { depth: number; children: RCHOICE[]; questionText: string; raw: AugmentedSurveyQuestion; }) => RQUESTION;
  onIntermediateNode: (args: { flowNode: FlowNode; depth: number; children: RRECURSIVE[] | RQUESTION[]; }) => RRECURSIVE;
  onRootNode: (args: { children: RRECURSIVE[]; }) => R;
}) => {
  const recursive = (flowNode: FlowNode, depth: number): RRECURSIVE | undefined => {
    if (flowNode.type === "BlockRandomizer" || flowNode.type === "Group" || flowNode.type === "Block") {
      const children = flowNode.type !== "Block" ?
        flowNode.children.map(child => recursive(child, depth + 1)).filter(isNonNull) :
        flowNode.questions.map(q => {
          const { QuestionText: questionText, Choices, ChoiceOrder } = q.Payload;
          const choiceObjects = Choices == null ? [] :
            ChoiceOrder == null ? Object.values(Choices ?? []) :
              ChoiceOrder.map(index => Choices[`${index}`]);
          const children = choiceObjects.map((choice, choiceIndex) => callbacks.onChoice({ depthOfQuestion: depth + 1, choiceString: choice.Display, choiceIndex, choice, allChoices: choiceObjects }));
          return callbacks.onQuestion({ depth: depth + 1, questionText, children, raw: q });
        });
      return callbacks.onIntermediateNode({ depth, flowNode, children });
    } else {
      return;
    }
  };
  return (rootNode: FlowNode & {type: "Root"}) => {
    const children = rootNode.children.map(child => recursive(child, 0)).filter(isNonNull);
    return callbacks.onRootNode({ children });      
  };
};
