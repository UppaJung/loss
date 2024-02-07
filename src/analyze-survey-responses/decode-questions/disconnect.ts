import { getMultipleAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";


export enum DisconnectWhatLabels {
  Unexpected = 'Unexpected Behavior',
  BrokePromise = 'Broken Promise',
  Unreliable = 'Unreliable',
	Other = 'Other',
}

export const [decodeDisconnectWhat, DisconnectWhatList] = getMultipleAnswerDecoderAndLabels([
  ["I did not expect", DisconnectWhatLabels.Unexpected],
  ["broke a promise", DisconnectWhatLabels.BrokePromise],
  ["low quality", DisconnectWhatLabels.Unreliable],
  ["other (please describe)", DisconnectWhatLabels.Other],
]);

export enum DisconnectHarmLabels {
  LostData = 'Lost Data',
  LostAccessAndServices = 'Lost Access/Services',
  Unavailable = 'Unavailable',
	Other = 'Other',
}

export const [decodeDisconnectHarm, DisconnectHarmList] = getMultipleAnswerDecoderAndLabels([
  ["lost data", DisconnectHarmLabels.LostData],
  ["lost access", DisconnectHarmLabels.LostAccessAndServices],
  ["available", DisconnectHarmLabels.Unavailable],
  ["other (please describe)", DisconnectHarmLabels.Other],
]);
