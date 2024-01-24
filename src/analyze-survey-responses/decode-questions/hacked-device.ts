import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";

export enum AnswerToHackedDeviceHowLabels {
  CompromisedRemotely = 'Compromised Remotely',
  Stolen = 'Stolen',
  WithoutPermission = 'Without Permission',
  ExceededDataPermission = 'Exceeded Data Permission',
  ExceededOtherPermission = 'Exceeded Other Permission',
  RegrettedPermitting = "Regretted Permitting",
  Other = 'Other',
};

export const [decodeHackedDeviceHow, AnswerToHackedDeviceHowList] = getAnswerDecoderAndLabels([
  ["compromised remotely", AnswerToHackedDeviceHowLabels.CompromisedRemotely], // The device was compromised remotely (e.g., via a virus or malware)
  ["device was stolen", AnswerToHackedDeviceHowLabels.Stolen], // The device was stolen
  ["used by someone who did not have my permission", AnswerToHackedDeviceHowLabels.WithoutPermission], // The device was used by someone who did not have my permission to use it
  ["used by someone with my permission", AnswerToHackedDeviceHowLabels.ExceededDataPermission], // The device was used by someone with my permission, but who used it to access data I did not want to share
  ["did something else I would not have permitted", AnswerToHackedDeviceHowLabels.ExceededOtherPermission], // ;The device was used by someone with my permission, but who did something else I would not have permitted if asked
  ["I later regretted permitting", AnswerToHackedDeviceHowLabels.RegrettedPermitting], // The device was used in a way that I later regretted permitting
  ["other", AnswerToHackedDeviceHowLabels.Other], // other (please describe)
]);

