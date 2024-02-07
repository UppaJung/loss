import { AugmentedSurveyResponses, SurveyKeys } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { filterAndDecodeExperiencedScenarioResponses } from "./common/filterAndDecodeResponses.ts";
import { AnswerToHackedDeviceHowList, decodeHackedDeviceHow } from "../../decode-questions/hacked-device.ts";
import { AnswerToLockedDeviceHowList, AnswerToLockedDeviceRecoveredDataList, AnswerToLockedDeviceRecoveryDurationList, decodeLockedDeviceHow, decodeLockedDeviceRecoveredData, decodeLockedDeviceRecoveryDuration } from "../../decode-questions/locked-device.ts";
import { BankAccountTypeList, LockedAccountHowList, SocialAccountTypeList, decodeBankAccountType, decodeHackedAccountHow, decodeHackedRecoveryDuration, decodeSocialAccountType, decodeLockedAccountRecoveryDuration, RecoveryDurationList, decodeRecoveryDuration } from "../../decode-questions/account.ts";
import { HackedAccountHowList } from "../../decode-questions/account.ts";
import { decodeAccountType } from "../../decode-questions/account.ts";
import { AccountTypeList } from "../../decode-questions/account.ts";
import { decodeLockedAccountHow } from "../../decode-questions/account.ts";
import { SurveyKeysPilot7 } from "../../survey-keys/index.ts";
import { decodeSwappedDeviceWhat } from "../../decode-questions/swap.ts";
import { SwappedDeviceWhatList } from "../../decode-questions/swap.ts";
import { decodeSwappedDeviceHarm } from "../../decode-questions/swap.ts";
import { SwappedDeviceHarmList } from "../../decode-questions/swap.ts";
import { decodeDisconnectWhat, DisconnectWhatList, decodeDisconnectHarm, DisconnectHarmList } from "../../decode-questions/disconnect.ts";


export const graphSeverityGroupedBarChartsData = (path: string, responses: AugmentedSurveyResponses<SurveyKeysPilot7>) => {

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
		...graphData("How long did it take to recover the compromised device?", SurveyKeys["hacked-device"], SurveyKeys["hacked-device-dur"], decodeHackedRecoveryDuration, RecoveryDurationList),

		...graphData("How did the participant get locked out of the device", SurveyKeys["locked-device"], SurveyKeys["locked-device-how"], decodeLockedDeviceHow, AnswerToLockedDeviceHowList),
		...graphData("Did you recover data from the locked device?", SurveyKeys["locked-device"], SurveyKeys["locked-device-recdat"], decodeLockedDeviceRecoveredData, AnswerToLockedDeviceRecoveredDataList),
		...graphData("How long did it take to recover?", SurveyKeys["locked-device"], SurveyKeys["locked-device-dur"], decodeLockedDeviceRecoveryDuration, AnswerToLockedDeviceRecoveryDurationList),

		...graphData("How was the participant's account compromised", SurveyKeys["hacked-acct"], SurveyKeys["hacked-acct-how"], decodeHackedAccountHow, HackedAccountHowList),
		...graphData("The type of account account compromised", SurveyKeys["hacked-acct"], SurveyKeys["hacked-acct-type"], decodeAccountType, AccountTypeList),
		...graphData("How long did it take to recover their compromised account?", SurveyKeys["hacked-acct"], SurveyKeys["hacked-acct-dur"], decodeHackedRecoveryDuration, RecoveryDurationList),

		...graphData("How participants' email/drive accounts were locked", SurveyKeys["locked-acct"], SurveyKeys["locked-acct-how"], decodeLockedAccountHow, LockedAccountHowList),
		...graphData("The type of email/drive account locked", SurveyKeys["locked-acct"], SurveyKeys["locked-acct-type"], decodeAccountType, AccountTypeList),
		...graphData("How much time to recover a locked email/drive account", SurveyKeys["locked-acct"], SurveyKeys["locked-acct-dur"], decodeLockedAccountRecoveryDuration, RecoveryDurationList),

		...graphData("How participants' social accounts were compromised", SurveyKeys["hacked-soc"], SurveyKeys["hacked-soc-how"], decodeHackedAccountHow, HackedAccountHowList),
		...graphData("The type of social account compromised", SurveyKeys["hacked-soc"], SurveyKeys["hacked-soc-type"], decodeSocialAccountType, SocialAccountTypeList),
		...graphData("Time to recover a compromised financial account", SurveyKeys["hacked-soc"], SurveyKeys["hacked-soc-dur"], decodeHackedRecoveryDuration, RecoveryDurationList),

		...graphData("How participants' social accounts were locked", SurveyKeys["locked-soc"], SurveyKeys["locked-soc-how"], decodeLockedAccountHow, LockedAccountHowList),
		...graphData("The type of social account locked", SurveyKeys["locked-soc"], SurveyKeys["locked-soc-type"], decodeSocialAccountType, SocialAccountTypeList),
		...graphData("How much time to recover a locked social account", SurveyKeys["locked-soc"], SurveyKeys["locked-soc-dur"], decodeLockedAccountRecoveryDuration, RecoveryDurationList),

		...graphData("How participants' social financial were compromised", SurveyKeys["hacked-bank"], SurveyKeys["hacked-bank-how"], decodeHackedAccountHow, HackedAccountHowList),
		...graphData("The type of financial account compromised", SurveyKeys["hacked-bank"], SurveyKeys["hacked-bank-type"], decodeBankAccountType, BankAccountTypeList),
		...graphData("How long did it take to recover their bank account?", SurveyKeys["hacked-bank"], SurveyKeys["hacked-bank-dur"], decodeHackedRecoveryDuration, RecoveryDurationList),

		...graphData("How participants' financial accounts were locked", SurveyKeys["locked-bank"], SurveyKeys["locked-bank-how"], decodeLockedAccountHow, LockedAccountHowList),
		...graphData("The type of financial account locked", SurveyKeys["locked-bank"], SurveyKeys["locked-bank-type"], decodeBankAccountType, BankAccountTypeList),
		...graphData("How much time to recover a locked financial account", SurveyKeys["locked-bank"], SurveyKeys["locked-bank-dur"], decodeLockedAccountRecoveryDuration, RecoveryDurationList),

		...graphData("What went wrong during device/os swap/upgrade", SurveyKeys["swap-device"], SurveyKeys["swap-device-what"], decodeSwappedDeviceWhat, SwappedDeviceWhatList),
		...graphData("The was the harm of a device/os swap/upgrade", SurveyKeys["swap-device"], SurveyKeys["swap-device-harm"], decodeSwappedDeviceHarm, SwappedDeviceHarmList),
		...graphData("How much time to recover after harm from device/os swap/upgrade", SurveyKeys["swap-device"], SurveyKeys["swap-device-dur"], decodeRecoveryDuration, RecoveryDurationList),

		...graphData("What went wrong during disconnect/broken promise", SurveyKeys["disconnect"], SurveyKeys["disconnect-how"], decodeDisconnectWhat, DisconnectWhatList),
		...graphData("What was the harm of a disconnect/broken promise", SurveyKeys["disconnect"], SurveyKeys["disconnect-harm"], decodeDisconnectHarm, DisconnectHarmList),
		...graphData("How much time to recover after harm from disconnect/broken promise", SurveyKeys["disconnect"], SurveyKeys["disconnect-dur"], decodeRecoveryDuration, RecoveryDurationList),

	};

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
	}export const BarGraphs = ${JSON.stringify(inputToAllGraphs, undefined, "\t")};`);
};
