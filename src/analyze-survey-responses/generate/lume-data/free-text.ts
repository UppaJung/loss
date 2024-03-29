import { SurveyKeys } from "../../survey-keys/index.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { filterNull } from "../../common/filterNull.ts";

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

export const countNonEmptyTrimmedStrings = (observedStrings: (string | undefined)[]) => filterNull(observedStrings)
	.map( s => s.trim() )
	.filter( observedString => observedString.length > 0)

.reduce( (result, observedString) => {
	result.instances[observedString] = (result.instances[observedString] ?? 0) + 1;
	result.total++;
	return result;
}, {total: 0, instances: {} as Record<string, number>});

export const stringCountSentenceFragment = (counts: {total: number, instances: Record<string, number>}) => {
	if (counts.total === 0) {
		return ''
	};
	const countStrings = Object.entries(counts.instances).map(([observedString, count]) =>
			`'${observedString}'${count > 1 ? ` (${count} occurrences)` : ''}`);
		if (countStrings.length > 1) {
			countStrings[countStrings.length - 1] = `and ${countStrings[countStrings.length - 1]}`;
		}
		return countStrings.join(countStrings.length > 2 ? ', ' : ' ');
}

export const stringCountSentence = (counts: {total: number, instances: Record<string, number>}) => `${
	counts.total === 0 ? `No participant provided a free-entry response` :
	counts.total > 1 ? `${counts.total} participants provided free entry responses: ` :
	`${counts.total} participant provided a free entry response: `
}${stringCountSentenceFragment(counts)}.`;

export const generateFreeTextMacrosPilot6 = (outPath: string, responses: AugmentedSurveyResponses) => {
	const toGenerate = [
		[SurveyKeys["hacked-device-how_4_TEXT"], "hackedDeviceHow"],
		[SurveyKeys["hacked-device-type_4_TEXT"], "HackedDeviceType"],
		[SurveyKeys["hacked-phone-type_3_TEXT"], "HackedPhoneType"],
		[SurveyKeys["hacked-tablet-type_3_TEXT"], "HackedTabletType"],
		[SurveyKeys["hacked-pc-type_3_TEXT"], "HackedPcType"],
		[SurveyKeys["hacked-device-when_4_TEXT"], "HackedDeviceWhen"],
		[SurveyKeys["locked-device-type_4_TEXT"], "lockedDeviceType"],
		[SurveyKeys["locked-phone-type_3_TEXT"], "lockedPhoneType"],
		[SurveyKeys["locked-tablet-type_3_TEXT"], "lockedTabletType"],
		[SurveyKeys["locked-pc-type_3_TEXT"], "lockedPcType"],
		[SurveyKeys["locked-device-how_4_TEXT"], "lockedDeviceHow"],
		[SurveyKeys["locked-device-recdat_4_TEXT"], "lockedDeviceRecDat"],
		[SurveyKeys["locked-device-recdat_4_TEXT"], "lockedDeviceRec"],
		[SurveyKeys["locked-device-when_4_TEXT"], "lockedDeviceWhen"],
		[SurveyKeys["hacked-acct-how_4_TEXT"], "HackedAcctHow"],
		[SurveyKeys["hacked-acct-type_7_TEXT"], "HackedAcctType"],
		[SurveyKeys["hacked-acct-when_4_TEXT"], "HackedAcctWhen"],
		[SurveyKeys["hacked-acct-dur_7_TEXT"], "HackedAcctRec"],
		[SurveyKeys["locked-acct-when_4_TEXT"], "lockedAcctWhen"],
		[SurveyKeys["locked-acct-type_7_TEXT"], "lockedAcctType"],
		[SurveyKeys["locked-acct-how_4_TEXT"], "lockedAcctHow"],
		[SurveyKeys["locked-acct-dur_7_TEXT"], "lockedAcctDuration"],
		[SurveyKeys["hacked-soc-how_4_TEXT"], "HackedSocHow"],
		[SurveyKeys["hacked-soc-type_8_TEXT"], "HackedSocType"],
		[SurveyKeys["hacked-soc-when_4_TEXT"], "HackedSocWhen"],
		[SurveyKeys["hacked-soc-dur_7_TEXT"], "HackedSocDuration"],
		[SurveyKeys["locked-soc-type_8_TEXT"], "lockedSocType"],
		[SurveyKeys["locked-soc-how_4_TEXT"], "lockedSocHow"],
		[SurveyKeys["locked-soc-when_4_TEXT"], "lockedSocWhen"],
		[SurveyKeys["locked-soc-dur_7_TEXT"], "lockedSocDuration"],
		[SurveyKeys["hacked-bank-how_4_TEXT"], "HackedBankHow"],
		[SurveyKeys["hacked-bank-type_7_TEXT"], "HackedBankType"],
		[SurveyKeys["hacked-bank-when_4_TEXT"], "HackedBankWhen"],
		[SurveyKeys["locked-bank-type_7_TEXT"], "lockedBankType"],
		[SurveyKeys["locked-bank-how_4_TEXT"], "lockedBankHow"],
		[SurveyKeys["locked-bank-when_4_TEXT"], "lockedBankWhen"],
		[SurveyKeys["locked-bank-dur_7_TEXT"], "lockedBankDuration"],
		[SurveyKeys["hacked-pwds-when_4_TEXT"], "HackedPwdsWhen"],
		[SurveyKeys["hacked-pwds-stored_10_TEXT"], "HackedPwdsStored"],
		[SurveyKeys["locked-pwds-stored_10_TEXT"], "lockedPwdsStored"],
		[SurveyKeys["locked-pwds-when_4_TEXT"], "lockedPwdsWhen"],
		[SurveyKeys["locked-pwds-dur_7_TEXT"], "lockedPwdsDuration"],
	 ] as const satisfies [keyof ((typeof responses)[number]), string][];


	const macros = toGenerate.reduce( (result, [key, label]) => {
			const counts = countNonEmptyTrimmedStrings(responses.map( response => response[key]));
			result.set(`${label}Total`, counts.total.toString()); 
			result.set(`${label}`, stringCountSentence(counts));
			return result;
		}, new Map<string, string>())
	Deno.writeTextFileSync(`${outPath}/${codeFileNameWithoutExtension}-data.ts`, 
		warningHeaderTs +
		[...macros.entries()].map( ([macroName, macroContent]) => `export const ${macroName} = ${JSON.stringify(macroContent)};`).join('\n')
	);
};


export const generateFreeTextMacros = (outPath: string, responses: AugmentedSurveyResponses) => {
	const toGenerate = [
		[SurveyKeys["hacked-device-how_4_TEXT"], "hackedDeviceHow"],
		[SurveyKeys["hacked-device-type_4_TEXT"], "HackedDeviceType"],
		[SurveyKeys["hacked-phone-type_3_TEXT"], "HackedPhoneType"],
		[SurveyKeys["hacked-tablet-type_3_TEXT"], "HackedTabletType"],
		[SurveyKeys["hacked-pc-type_3_TEXT"], "HackedPcType"],
		[SurveyKeys["hacked-device-when_4_TEXT"], "HackedDeviceWhen"],
		[SurveyKeys["locked-device-type_4_TEXT"], "lockedDeviceType"],
		[SurveyKeys["locked-phone-type_3_TEXT"], "lockedPhoneType"],
		[SurveyKeys["locked-tablet-type_3_TEXT"], "lockedTabletType"],
		[SurveyKeys["locked-pc-type_3_TEXT"], "lockedPcType"],
		[SurveyKeys["locked-device-how_4_TEXT"], "lockedDeviceHow"],
		[SurveyKeys["locked-device-recdat_4_TEXT"], "lockedDeviceRecDat"],
		[SurveyKeys["locked-device-recdat_4_TEXT"], "lockedDeviceRec"],
		[SurveyKeys["locked-device-when_4_TEXT"], "lockedDeviceWhen"],
		[SurveyKeys["hacked-acct-how_4_TEXT"], "HackedAcctHow"],
		[SurveyKeys["hacked-acct-type_7_TEXT"], "HackedAcctType"],
		[SurveyKeys["hacked-acct-when_4_TEXT"], "HackedAcctWhen"],
		[SurveyKeys["hacked-acct-dur_7_TEXT"], "HackedAcctRec"],
		[SurveyKeys["locked-acct-when_4_TEXT"], "lockedAcctWhen"],
		[SurveyKeys["locked-acct-type_7_TEXT"], "lockedAcctType"],
		[SurveyKeys["locked-acct-how_4_TEXT"], "lockedAcctHow"],
		[SurveyKeys["locked-acct-dur_7_TEXT"], "lockedAcctDuration"],
		[SurveyKeys["hacked-soc-how_4_TEXT"], "HackedSocHow"],
		[SurveyKeys["hacked-soc-type_8_TEXT"], "HackedSocType"],
		[SurveyKeys["hacked-soc-when_4_TEXT"], "HackedSocWhen"],
		[SurveyKeys["hacked-soc-dur_7_TEXT"], "HackedSocDuration"],
		[SurveyKeys["locked-soc-type_8_TEXT"], "lockedSocType"],
		[SurveyKeys["locked-soc-how_4_TEXT"], "lockedSocHow"],
		[SurveyKeys["locked-soc-when_4_TEXT"], "lockedSocWhen"],
		[SurveyKeys["locked-soc-dur_7_TEXT"], "lockedSocDuration"],
		[SurveyKeys["hacked-bank-how_4_TEXT"], "HackedBankHow"],
		[SurveyKeys["hacked-bank-type_7_TEXT"], "HackedBankType"],
		[SurveyKeys["hacked-bank-when_4_TEXT"], "HackedBankWhen"],
		[SurveyKeys["locked-bank-type_7_TEXT"], "lockedBankType"],
		[SurveyKeys["locked-bank-how_4_TEXT"], "lockedBankHow"],
		[SurveyKeys["locked-bank-when_4_TEXT"], "lockedBankWhen"],
		[SurveyKeys["locked-bank-dur_7_TEXT"], "lockedBankDuration"],
		[SurveyKeys["hacked-pwds-when_4_TEXT"], "HackedPwdsWhen"],
		[SurveyKeys["hacked-pwds-stored_10_TEXT"], "HackedPwdsStored"],
		[SurveyKeys["locked-pwds-stored_10_TEXT"], "lockedPwdsStored"],
		[SurveyKeys["locked-pwds-when_4_TEXT"], "lockedPwdsWhen"],
		[SurveyKeys["locked-pwds-dur_7_TEXT"], "lockedPwdsDuration"],
		[SurveyKeys["disconnect-dur_7_TEXT"], "brokenPromiseDuration"],
		[SurveyKeys["disconnect-how_3_TEXT"], "brokenPromiseHow"],
		[SurveyKeys["disconnect-harm_3_TEXT"], "brokenPromiseHarm"],
		[SurveyKeys["swap-device-when_4_TEXT"], "swapUpgradeWhen"],
		[SurveyKeys["swap-device-harm_3_TEXT"], "swapUpgradeHarm"],
		[SurveyKeys["swap-device-what_3_TEXT"], "swapUpgradeHow"],
		[SurveyKeys["gender_4_TEXT"], "gender"],
//[		"Q15_4_TEXT": "Q15_4_TEXT",
	 ] as const satisfies [keyof ((typeof responses)[number]), string][];


	const macros = toGenerate.reduce( (result, [key, label]) => {
			const counts = countNonEmptyTrimmedStrings(responses.map( response => response[key]));
			result.set(`${label}Total`, counts.total.toString()); 
			result.set(`${label}`, stringCountSentence(counts));
			return result;
		}, new Map<string, string>())
	Deno.writeTextFileSync(`${outPath}/${codeFileNameWithoutExtension}-data.ts`, 
		warningHeaderTs +
		[...macros.entries()].map( ([macroName, macroContent]) => `export const ${macroName} = ${JSON.stringify(macroContent)};`).join('\n')
	);
};
