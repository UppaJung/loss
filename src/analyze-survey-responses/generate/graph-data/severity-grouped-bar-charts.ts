import { AugmentedSurveyResponses, SurveyKeys } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { filterAndDecodeExperiencedScenarioResponses } from "./common/filterAndDecodeResponses.ts";
import { AnswerToHackedDeviceHowList, decodeHackedDeviceHow } from "../../decode-questions/hacked-device.ts";
import { AnswerToLockedDeviceHowList, AnswerToLockedDeviceRecoveredDataList, AnswerToLockedDeviceRecoveryDurationList, decodeLockedDeviceHow, decodeLockedDeviceRecoveredData, decodeLockedDeviceRecoveryDuration } from "../../decode-questions/locked-device.ts";
import { HackedAccountRecoveryDurationList, BankAccountTypeList, LockedAccountHowList, SocialAccountTypeList, decodeBankAccountType, decodeHackedAccountHow, decodeHackedAccountRecoveryDuration, decodeSocialAccountType, decodeLockedAccountRecoveryDuration, LockedAccountRecoveryDurationList } from "../../decode-questions/account.ts";
import { HackedAccountHowList } from "../../decode-questions/account.ts";
import { decodeAccountType } from "../../decode-questions/account.ts";
import { AccountTypeList } from "../../decode-questions/account.ts";
import { decodeLockedAccountHow } from "../../decode-questions/account.ts";

// const RANGE = {count: 3, min: -30, max: 30};
/*
  "hacked-device-how": "hacked-device-how",
*/



export const graphSeverityGroupedBarChartsData = (path: string, responses: AugmentedSurveyResponses) => {

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
		...graphData("How the device was compromised.", SurveyKeys["hacked-device"], SurveyKeys["hacked-device-how"], decodeHackedDeviceHow, AnswerToHackedDeviceHowList),
		...graphData("How did the participant get locked out of the device", SurveyKeys["locked-device"], SurveyKeys["locked-device-how"], decodeLockedDeviceHow, AnswerToLockedDeviceHowList),
		...graphData("Did you recover data from the locked device?", SurveyKeys["locked-device"], SurveyKeys["locked-device-recdat"], decodeLockedDeviceRecoveredData, AnswerToLockedDeviceRecoveredDataList),
		...graphData("How long did it take to recover?", SurveyKeys["locked-device"], SurveyKeys["locked-device-rec"], decodeLockedDeviceRecoveryDuration, AnswerToLockedDeviceRecoveryDurationList),

		...graphData("How did the participant get locked out of the account", SurveyKeys["hacked-acct"], SurveyKeys["hacked-acct-how"], decodeHackedAccountHow, HackedAccountHowList),
		...graphData("The type of account the participant was locked out of", SurveyKeys["hacked-acct"], SurveyKeys["hacked-acct-type"], decodeAccountType, AccountTypeList),
		...graphData("How long did it take to recover their account?", SurveyKeys["hacked-acct"], SurveyKeys["hacked-acct-rec"], decodeHackedAccountRecoveryDuration, HackedAccountRecoveryDurationList),

		...graphData("How participants' email/drive accounts were locked", SurveyKeys["locked-acct"], SurveyKeys["locked-acct-how"], decodeLockedAccountHow, LockedAccountHowList),
		...graphData("The type of email/drive account locked", SurveyKeys["locked-acct"], SurveyKeys["locked-acct-type"], decodeAccountType, AccountTypeList),
		...graphData("How time to recover a locked email/drive account", SurveyKeys["locked-acct"], SurveyKeys["locked-acct-duration"], decodeLockedAccountRecoveryDuration, LockedAccountRecoveryDurationList),

		...graphData("How participants' social accounts were compromised", SurveyKeys["hacked-soc"], SurveyKeys["hacked-soc-how"], decodeHackedAccountHow, HackedAccountHowList),
		...graphData("The type of social account compromised", SurveyKeys["hacked-soc"], SurveyKeys["hacked-soc-type"], decodeSocialAccountType, SocialAccountTypeList),
		...graphData("How time to recover a compromised financial account", SurveyKeys["hacked-soc"], SurveyKeys["hacked-soc-duration"], decodeHackedAccountRecoveryDuration, HackedAccountRecoveryDurationList),

		...graphData("How participants' social accounts were locked", SurveyKeys["locked-soc"], SurveyKeys["locked-soc-how"], decodeLockedAccountHow, LockedAccountHowList),
		...graphData("The type of social account locked", SurveyKeys["locked-soc"], SurveyKeys["locked-soc-type"], decodeSocialAccountType, SocialAccountTypeList),
		...graphData("How time to recover a locked social account", SurveyKeys["locked-soc"], SurveyKeys["locked-soc-duration"], decodeLockedAccountRecoveryDuration, LockedAccountRecoveryDurationList),

		...graphData("How participants' social financial were compromised", SurveyKeys["hacked-bank"], SurveyKeys["hacked-bank-how"], decodeHackedAccountHow, HackedAccountHowList),
		...graphData("The type of financial account compromised", SurveyKeys["hacked-bank"], SurveyKeys["hacked-bank-type"], decodeBankAccountType, BankAccountTypeList),
//		...graphData("How long did it take to recover their bank account?", SurveyKeys["hacked-bank"], SurveyKeys["hacked-bank-duration"], decodeHackedAccountRecoveryDuration, AnswerToHackedAccountRecoveryDurationList),
// FIXME -- should we add that question?

	...graphData("How participants' financial accounts were locked", SurveyKeys["locked-bank"], SurveyKeys["locked-bank-how"], decodeLockedAccountHow, LockedAccountHowList),
	...graphData("The type of financial account locked", SurveyKeys["locked-bank"], SurveyKeys["locked-bank-type"], decodeBankAccountType, BankAccountTypeList),
	...graphData("How time to recover a locked financial account", SurveyKeys["locked-bank"], SurveyKeys["locked-bank-dur"], decodeLockedAccountRecoveryDuration, LockedAccountRecoveryDurationList),
	};

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
	}export const BarGraphs = ${JSON.stringify(inputToAllGraphs, undefined, "\t")};`);
};
