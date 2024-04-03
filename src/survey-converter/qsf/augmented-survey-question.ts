import type { Choice, SurveyQuestion, BlockElement } from "./types.ts";
import { isNonNull } from "./type-guards.ts";


export interface AugmentedSurveyQuestion extends SurveyQuestion {
  skipToEndOfBlockIfChoices?: Choice[];
  isLikert7: boolean;
}

export const augmentSurveyQuestion = (element: BlockElement, question: SurveyQuestion): AugmentedSurveyQuestion => {
  const { SkipLogic } = element;
  const { Payload } = question;
  const { Choices } = Payload;
  const isLikert7 = (Choices != null && Object.values(Choices).length == 7 &&
    Object.values(Choices).map(c => c.Display).sort().filter((s, index) => s == (index + 1).toString()).length === 7);
  const skipToEndOfBlockIfChoices = (SkipLogic == null) ? [] :
    SkipLogic.map(skipLogic => {
      if (skipLogic.SkipToDestination === "ENDOFBLOCK" && skipLogic.QuestionID == Payload.QuestionID && skipLogic.Condition === "Selected") {
        const option = (skipLogic.Locator.split("/").pop() ?? "") as `${number}`;
        return Choices?.[option];
      }
    }).filter(isNonNull);
  return { ...question, isLikert7, skipToEndOfBlockIfChoices };
};
