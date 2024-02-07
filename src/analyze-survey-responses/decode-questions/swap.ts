import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";
import { getMultipleAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";

export enum SwappedDeviceWhatLabels {
  Device = 'Device',
  Software = 'Software',
	Other = 'Other',
}

export const [decodeSwappedDeviceWhat, SwappedDeviceWhatList] = getAnswerDecoderAndLabels([
  ["Replacing the device", SwappedDeviceWhatLabels.Device],
  ["software", SwappedDeviceWhatLabels.Software],
  ["other (please", SwappedDeviceWhatLabels.Other],
]);

export enum SwappedDeviceHarmLabels {
  DeviceData = 'Device Data',
	AppData = 'App Data',
  AccessToAppsAndServices = 'Access to Apps/Services',
	Other = 'Other',
}

export const [decodeSwappedDeviceHarm, SwappedDeviceHarmList] = getMultipleAnswerDecoderAndLabels([
  ["Data on the device", SwappedDeviceHarmLabels.DeviceData],
  ["Data within certain apps", SwappedDeviceHarmLabels.AppData],
  ["Access to", SwappedDeviceHarmLabels.AccessToAppsAndServices],
  ["other (please", SwappedDeviceHarmLabels.Other],
]);
