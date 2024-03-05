import { tallyResponses } from "../../../common/tallyResponses.ts";
import { numeric } from "../../../common/numeric.ts";
import { AnswersIndicatingParticipantExperiencedScenario, AnswerIndicatingParticipantExperiencedScenario, decodeMatchingQuestion } from "../../../decode-questions/matching-question.ts";
import { SurveyKey } from "../../../survey-keys/index.ts";
import { AugmentedSurveyResponse } from "../../../survey-keys/index.ts";

export const filterAndDecodeExperiencedScenarioResponses = <LABEL extends string, RESPONSE extends Omit<AugmentedSurveyResponse, "startDate">>(
  responses: (RESPONSE)[],
  labels: readonly LABEL[],
  matchingQuestionKey: Exclude<SurveyKey, "startDate">,
  decodeFn: (response: RESPONSE) =>LABEL | LABEL[] | undefined
) => Object.fromEntries(AnswersIndicatingParticipantExperiencedScenario.map(match => {
  const talliedResponses = tallyResponses(
    responses.filter(response => decodeMatchingQuestion(response[matchingQuestionKey]) === match).map(decodeFn)
  );
  const data = labels.map(label => numeric(talliedResponses[label]));
  return [match, data] satisfies [AnswerIndicatingParticipantExperiencedScenario, number[]];
})) as Record<AnswerIndicatingParticipantExperiencedScenario, number[]>;
