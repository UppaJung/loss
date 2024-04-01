import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";
import { AugmentedSurveyResponse } from "../survey-keys/index.ts";

export enum DeviceType {
	Phone = 'Phone',
	Tablet = 'Tablet',
	Computer = 'Computer',
	Other = 'Other Device'
};

export const [decodeDeviceTypeQuestion, DeviceTypeList] = getAnswerDecoderAndLabels([
	["Phone", DeviceType.Phone],
	["Tablet", DeviceType.Tablet],
	["Computer", DeviceType.Computer],
	["other", DeviceType.Other],
]);

export enum PhoneType {
	iPhone = 'iPhone',
	Android = 'Android Phone',
	Other = 'Other Phone',
};

export const [decodePhoneTypeQuestion, PhoneTypeList] = getAnswerDecoderAndLabels([
	["iPhone", PhoneType.iPhone],
	["Android", PhoneType.Android],
	["other", PhoneType.Other],
]);

export enum TabletType {
	iPad = 'iPad',
	Android = 'Android Tablet',
	Other = 'Other Tablet',
};

export const [decodeTabletTypeQuestion, TabletTypeList] = getAnswerDecoderAndLabels([
	["iPad", TabletType.iPad],
	["Android", TabletType.Android],
	[/^other$/, TabletType.Other],
]);

export enum ComputerType {
	Mac = 'Mac',
	Windows = 'Windows',
	UNIX = 'UNIX',
	Other = 'Other Computer',
};

export const [decodeComputerTypeQuestion, ComputerTypeList] = getAnswerDecoderAndLabels([
	["Mac", ComputerType.Mac],
	["Windows", ComputerType.Windows],
	["UNIX variant", ComputerType.UNIX],
	[/^other$/, ComputerType.Other],
]);

export const DetailedDeviceTypeList = [...PhoneTypeList, ...TabletTypeList, ...ComputerTypeList];

export const decodeDetailedDeviceType = (failureMode: "hacked" | "locked") => (response: AugmentedSurveyResponse) =>
decodePhoneTypeQuestion(response[`${failureMode}-phone-type`]) ??
decodeTabletTypeQuestion(response[`${failureMode}-tablet-type`]) ??
decodeComputerTypeQuestion(response[`${failureMode}-pc-type`]);

