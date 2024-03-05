import type { AugmentedSurveyResponses } from "../../../survey-keys/index.ts";
import { filterAndDecodeExperiencedScenarioResponses } from "./filterAndDecodeResponses.ts";

export const decodeAndTallyResponsesForScenarioRecognizedByParticipant = <LABEL extends string>(
  labels: readonly LABEL[],
  accountType: 'acct' | 'soc' | 'bank',
  decodeFn: (answer: string) => LABEL | undefined,
  responses: AugmentedSurveyResponses
) => {
  const tally = (failureMode: 'hacked' | 'locked') => filterAndDecodeExperiencedScenarioResponses(responses, labels, `${failureMode}-${accountType}?`,
   response => decodeFn(response[`${failureMode}-${accountType}-type`]));
  const data = {
    'Compromised': tally('hacked'),
    'Locked Out': tally('locked'),
  };
  return { labels, data };
};
