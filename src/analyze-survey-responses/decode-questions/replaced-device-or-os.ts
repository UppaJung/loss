import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";
import { getMultipleAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";

export enum ReplacedDeviceOrOsWhatLabels {
  Device = 'Device',
  Software = 'Software',
	Other = 'Other',
}

export const [decodeReplacedDeviceOrOsWhat, ReplacedDeviceOrOsWhatList] = getAnswerDecoderAndLabels([
  ["Replacing the device", ReplacedDeviceOrOsWhatLabels.Device],
  ["software", ReplacedDeviceOrOsWhatLabels.Software],
  ["other (please", ReplacedDeviceOrOsWhatLabels.Other],
]);

export enum ReplacedDeviceOrOsHarmLabels {
  DeviceData = 'Device Data',
	AppData = 'App Data',
  AccessToAppsAndServices = 'Access to Apps/Services',
	Other = 'Other',
}

export const [decodeReplacedDeviceOrOsHarm, ReplacedDeviceOrOsHarmList] = getMultipleAnswerDecoderAndLabels([
  ["Data on the device", ReplacedDeviceOrOsHarmLabels.DeviceData],
  ["Data within certain apps", ReplacedDeviceOrOsHarmLabels.AppData],
  ["Access to", ReplacedDeviceOrOsHarmLabels.AccessToAppsAndServices],
  ["other (please", ReplacedDeviceOrOsHarmLabels.Other],
]);
