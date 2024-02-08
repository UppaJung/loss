import { getAnswerDecoderAndLabels, getMultipleAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";


// I forgot a PIN or password
// The device no longer recognized my fingerprint
// The device no longer recognized my face
// The PIN or password was recently changed
// There was a problem with software on the device (e.g. failed upgrade)
// The device broke due to physical impact (e.g., dropped)
// The device broke for reasons other than physical impact
// other (please describe)

export enum AnswerToLockedDeviceHowLabels {
  Forgot = 'Forgot PIN/Password',
  Fingerprint = 'Unrecognized Fingerprint',
  Face = 'Unrecognized Face',
  RecentChange = 'Recent PIN/Password Change',
  Software = 'Software/Update',
  Impact = "Broke (impact)",
  BrokeOther = "Broke (other)",
  Other = 'Other',
};

export const [decodeLockedDeviceHow, AnswerToLockedDeviceHowList] = getMultipleAnswerDecoderAndLabels([
  ["forgot", AnswerToLockedDeviceHowLabels.Forgot],
  ["fingerprint", AnswerToLockedDeviceHowLabels.Fingerprint],
  ["face", AnswerToLockedDeviceHowLabels.Face],
  ["recently changed", AnswerToLockedDeviceHowLabels.RecentChange],
  ["software", AnswerToLockedDeviceHowLabels.Software],
  ["due to physical impact", AnswerToLockedDeviceHowLabels.Impact],
  ["broke for reasons other", AnswerToLockedDeviceHowLabels.BrokeOther],
  ["other (please describe)", AnswerToLockedDeviceHowLabels.Other],
]);


// 'locked-device-recdat'
//I never recovered any of the data from the device
//I regained access to only some of the data on the device, but some was permanently lost
//I regained access to all of the data on the device
//other (please describe)
export enum AnswerToLockedDeviceRecoveredDataLabels {
  Never = 'None',
  Some = 'Some',
  All = 'All',
  Other = 'Other',
}
export const [decodeLockedDeviceRecoveredData, AnswerToLockedDeviceRecoveredDataList] = getAnswerDecoderAndLabels([
  ["never", AnswerToLockedDeviceRecoveredDataLabels.Never],
  ["only some", AnswerToLockedDeviceRecoveredDataLabels.Some],
  ["regained access to all", AnswerToLockedDeviceRecoveredDataLabels.All],
  ["other (please describe)", AnswerToLockedDeviceRecoveredDataLabels.Other],
]);
