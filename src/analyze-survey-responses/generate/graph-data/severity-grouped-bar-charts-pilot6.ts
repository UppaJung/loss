import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { filterAndDecodeExperiencedScenarioResponses } from "./common/filterAndDecodeResponses.ts";
import { AnswerToHackedDeviceHowList, decodeHackedDeviceHow } from "../../decode-questions/hacked-device.ts";
import { AnswerToLockedDeviceHowList, AnswerToLockedDeviceRecoveredDataList, AnswerToLockedDeviceRecoveryDurationList, decodeLockedDeviceHow, decodeLockedDeviceRecoveredData, decodeLockedDeviceRecoveryDuration } from "../../decode-questions/locked-device.ts";
import { BankAccountTypeList, LockedAccountHowList, SocialAccountTypeList, decodeBankAccountType, decodeHackedAccountHow, decodeHackedRecoveryDuration, decodeSocialAccountType, decodeLockedAccountRecoveryDuration, RecoveryDurationList } from "../../decode-questions/account.ts";
import { HackedAccountHowList } from "../../decode-questions/account.ts";
import { decodeAccountType } from "../../decode-questions/account.ts";
import { AccountTypeList } from "../../decode-questions/account.ts";
import { decodeLockedAccountHow } from "../../decode-questions/account.ts";
import { SurveyKeysPilot6 } from "../../survey-keys/index.ts";

// const RANGE = {count: 3, min: -30, max: 30};
/*
  "hacked-device-how": "hacked-device-how",
*/



export const graphSeverityGroupedBarChartsDataPilot6 = (path: string, responses: AugmentedSurveyResponses<SurveyKeysPilot6>) => {

	const graphData = <KEY extends keyof ((typeof responses)[number]), LABEL extends string>(
		xTitle: string,
		matchKey: Exclude<keyof ((typeof responses)[number]), "startDate">,
		key: Exclude<KEY, "startDate">,
		decode: (answer: string) => LABEL | LABEL[] | undefined,
		labels: LABEL[]
	) => { //: {KEY: {xTitle: string, labels: LABEL[], data: ReturnType<typeof filterAndDecodeExperiencedScenarioResponses<LABEL>>}} => {
		const data = filterAndDecodeExperiencedScenarioResponses(responses, labels, matchKey, r => decode(r[key]));
		return {[key]: {xTitle, labels, data}};
	}

	const inputToAllGraphs = {
		...graphData("How the device was compromised.", SurveyKeysPilot6["hacked-device"], SurveyKeysPilot6["hacked-device-how"], decodeHackedDeviceHow, AnswerToHackedDeviceHowList),
		...graphData("How did the participant get locked out of the device", SurveyKeysPilot6["locked-device"], SurveyKeysPilot6["locked-device-how"], decodeLockedDeviceHow, AnswerToLockedDeviceHowList),
		...graphData("Did you recover data from the locked device?", SurveyKeysPilot6["locked-device"], SurveyKeysPilot6["locked-device-recdat"], decodeLockedDeviceRecoveredData, AnswerToLockedDeviceRecoveredDataList),
		...graphData("How long did it take to recover?", SurveyKeysPilot6["locked-device"], SurveyKeysPilot6["locked-device-rec"], decodeLockedDeviceRecoveryDuration, AnswerToLockedDeviceRecoveryDurationList),

		...graphData("How did the participant get locked out of the account", SurveyKeysPilot6["hacked-acct"], SurveyKeysPilot6["hacked-acct-how"], decodeHackedAccountHow, HackedAccountHowList),
		...graphData("The type of account the participant was locked out of", SurveyKeysPilot6["hacked-acct"], SurveyKeysPilot6["hacked-acct-type"], decodeAccountType, AccountTypeList),
		...graphData("How long did it take to recover their account?", SurveyKeysPilot6["hacked-acct"], SurveyKeysPilot6["hacked-acct-rec"], decodeHackedRecoveryDuration, RecoveryDurationList),

		...graphData("How participants' email/drive accounts were locked", SurveyKeysPilot6["locked-acct"], SurveyKeysPilot6["locked-acct-how"], decodeLockedAccountHow, LockedAccountHowList),
		...graphData("The type of email/drive account locked", SurveyKeysPilot6["locked-acct"], SurveyKeysPilot6["locked-acct-type"], decodeAccountType, AccountTypeList),
		...graphData("How time to recover a locked email/drive account", SurveyKeysPilot6["locked-acct"], SurveyKeysPilot6["locked-acct-duration"], decodeLockedAccountRecoveryDuration, RecoveryDurationList),

		...graphData("How participants' social accounts were compromised", SurveyKeysPilot6["hacked-soc"], SurveyKeysPilot6["hacked-soc-how"], decodeHackedAccountHow, HackedAccountHowList),
		...graphData("The type of social account compromised", SurveyKeysPilot6["hacked-soc"], SurveyKeysPilot6["hacked-soc-type"], decodeSocialAccountType, SocialAccountTypeList),
		...graphData("How time to recover a compromised financial account", SurveyKeysPilot6["hacked-soc"], SurveyKeysPilot6["hacked-soc-duration"], decodeHackedRecoveryDuration, RecoveryDurationList),

		...graphData("How participants' social accounts were locked", SurveyKeysPilot6["locked-soc"], SurveyKeysPilot6["locked-soc-how"], decodeLockedAccountHow, LockedAccountHowList),
		...graphData("The type of social account locked", SurveyKeysPilot6["locked-soc"], SurveyKeysPilot6["locked-soc-type"], decodeSocialAccountType, SocialAccountTypeList),
		...graphData("How time to recover a locked social account", SurveyKeysPilot6["locked-soc"], SurveyKeysPilot6["locked-soc-duration"], decodeLockedAccountRecoveryDuration, RecoveryDurationList),

		...graphData("How participants' social financial were compromised", SurveyKeysPilot6["hacked-bank"], SurveyKeysPilot6["hacked-bank-how"], decodeHackedAccountHow, HackedAccountHowList),
		...graphData("The type of financial account compromised", SurveyKeysPilot6["hacked-bank"], SurveyKeysPilot6["hacked-bank-type"], decodeBankAccountType, BankAccountTypeList),
//		...graphData("How long did it take to recover their bank account?", SurveyKeysPilot6["hacked-bank"], SurveyKeysPilot6["hacked-bank-duration"], decodeHackedAccountRecoveryDuration, AnswerToHackedAccountRecoveryDurationList),
// FIXME -- should we add that question?

	...graphData("How participants' financial accounts were locked", SurveyKeysPilot6["locked-bank"], SurveyKeysPilot6["locked-bank-how"], decodeLockedAccountHow, LockedAccountHowList),
	...graphData("The type of financial account locked", SurveyKeysPilot6["locked-bank"], SurveyKeysPilot6["locked-bank-type"], decodeBankAccountType, BankAccountTypeList),
	...graphData("How time to recover a locked financial account", SurveyKeysPilot6["locked-bank"], SurveyKeysPilot6["locked-bank-dur"], decodeLockedAccountRecoveryDuration, RecoveryDurationList),
	};

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
	}export const BarGraphs = ${JSON.stringify(inputToAllGraphs, undefined, "\t")};`);
};
