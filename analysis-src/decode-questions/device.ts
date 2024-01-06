import { answerSpec } from "../utilities/validateAnswer.ts";

export enum DeviceType {
	Phone = 'Phone',
	Tablet = 'Tablet',
	Computer = 'Computer',
	Other = 'Other Device'
};

export const [decodeDeviceTypeQuestion, DeviceTypeList] = answerSpec([
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

export const [decodePhoneTypeQuestion, PhoneTypeList] = answerSpec([
	["iPhone", PhoneType.iPhone],
	["Android", PhoneType.Android],
	["other", PhoneType.Other],
]);

export enum TabletType {
	iPad = 'iPad',
	Android = 'Android Tablet',
	Other = 'Other Tablet',
};

export const [decodeTabletTypeQuestion, TabletTypeList] = answerSpec([
	["iPad", TabletType.iPad],
	["Android", TabletType.Android],
	["other", TabletType.Other],
]);

export enum ComputerType {
	Mac = 'Mac',
	Windows = 'Windows',
	UNIX = 'UNIX',
	Other = 'Other Computer',
};

export const [decodeComputerTypeQuestion, ComputerTypeList] = answerSpec([
	["Mac", ComputerType.Mac],
	["Windows", ComputerType.Windows],
	["UNIX", ComputerType.UNIX],
	["other", ComputerType.Other],
]);


