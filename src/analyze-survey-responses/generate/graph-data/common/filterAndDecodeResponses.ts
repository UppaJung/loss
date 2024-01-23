import { tallyResponses } from "../../../common/tallyResponses.ts";
import { numeric } from "../../../common/numeric.ts";
import { AnswersIndicatingParticipantExperiencedScenario, AnswerIndicatingParticipantExperiencedScenario, decodeMatchingQuestion } from "../../../decode-questions/matching-question.ts";

export const filterAndDecodeExperiencedScenarioResponses = <LABEL extends string, SURVEY_KEY extends string, RESPONSE extends Record<Exclude<SURVEY_KEY, "startDate">, string>>(
  responses: (RESPONSE)[],
  labels: readonly LABEL[],
  matchingQuestionKey: Exclude<SURVEY_KEY, "startDate">,
  decodeFn: (response: RESPONSE) =>LABEL | LABEL[] | undefined
) => Object.fromEntries(AnswersIndicatingParticipantExperiencedScenario.map(match => {
  const talliedResponses = tallyResponses(
    responses.filter(response => decodeMatchingQuestion(response[matchingQuestionKey]) === match).map(decodeFn)
  );
  const data = labels.map(label => numeric(talliedResponses[label]));
  return [match, data] satisfies [AnswerIndicatingParticipantExperiencedScenario, number[]];
})) as Record<AnswerIndicatingParticipantExperiencedScenario, number[]>;
