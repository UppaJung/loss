import { tallyResponses } from "../../../common/tallyResponses.ts";
import type { AugmentedSurveyResponse, AugmentedSurveyResponses, SurveyKey } from "../../../survey-keys/index.ts";
import { numeric } from "../../../common/numeric.ts";
import { AnswersIndicatingParticipantExperiencedScenario, AnswerIndicatingParticipantExperiencedScenario, decodeMatchingQuestion } from "../../../decode-questions/matching-question.ts";

export const filterAndDecodeExperiencedScenarioResponses = <LABEL extends string>(
  responses: AugmentedSurveyResponses<SurveyKey>,
  labels: readonly LABEL[],
  matchingQuestionKey: SurveyKey,
  decodeFn: (response: AugmentedSurveyResponse<SurveyKey>) =>LABEL | undefined
) => Object.fromEntries(AnswersIndicatingParticipantExperiencedScenario.map(match => {
  const talliedResponses = tallyResponses(
    responses.filter(response => decodeMatchingQuestion(response[matchingQuestionKey]) === match).map(decodeFn)
  );
  const data = labels.map(label => numeric(talliedResponses[label]));
  return [match, data] satisfies [AnswerIndicatingParticipantExperiencedScenario, number[]];
})) as Record<AnswerIndicatingParticipantExperiencedScenario, number[]>;
