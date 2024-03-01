import { getMultipleAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";


// I used the technology in a way that I did not intend and that led to my embarrassment
// I used the technology in a way that I did intend and that led to my embarrassment
// Others used technology I relied on to stalk me
// Others used technology in a way that unintentionally embarrassed me
// Others used technology to intentionally embarrass me
// Other (please explain) 

export enum AbuseWhatLabels {
  EmbarrassedByUnintendedAction = 'Embarrassed by unintended action',
  EmbarrassedByIntendedAction = 'Embarrassed by intended action',
  EmbarrassedByOthersIntentionally = 'Intentionally embarrassed by others',
  EmbarrassedByOthersUnintentionally = 'Unintentionally embarrassed by others',
  Stalked = 'Stalked',
	Other = 'Other',
}

export const [decodeAbuseWhat, AbuseWhatList] = getMultipleAnswerDecoderAndLabels([
  ["I did not intend and that led to my embarrassment", AbuseWhatLabels.EmbarrassedByUnintendedAction],
  ["I did intend and that led to my embarrassment", AbuseWhatLabels.EmbarrassedByIntendedAction],
  ["stalk", AbuseWhatLabels.Stalked],
  ["way that unintentionally embarrassed me", AbuseWhatLabels.EmbarrassedByOthersIntentionally],
  ["Others used technology to intentionally embarrass me", AbuseWhatLabels.EmbarrassedByOthersUnintentionally],
  ["other (please", AbuseWhatLabels.Other],
]);
