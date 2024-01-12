import { tallyResponses } from "../../common/tallyResponses.ts";
import { filterNull } from "../../common/filterNull.ts";
import type { AugmentedSurveyResponses, SurveyKey } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { AccountTypeQuestionList, FinancialAccountTypeQuestionList, SocialAccountTypeQuestionList, decodeAccountTypeQuestion, decodeFinancialAccountTypeQuestion, decodeSocialAccountTypeQuestion } from "../../decode-questions/account-type.ts";
import { numeric } from "../../common/numeric.ts";

export const accountTypeData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {


	// const decodeAndTallyResponses = <LABEL extends string>(key: SurveyKey, decodeFn: (answer: string) => LABEL | undefined): Partial<Record<LABEL, number>> =>
	// 	tallyResponses(filterNull(responses.map( response => response[key]).map( decodeFn )));

	const decodeAndTallyResponses = <LABEL extends string>(labels: readonly LABEL[], keyFn: (failureMode: 'hacked' | 'locked') => SurveyKey, decodeFn: (answer: string) => LABEL | undefined) => {
		const [compromisedTallies, lockedTallies] = (["hacked", "locked"] as const).map( failureMode => 
			tallyResponses(filterNull(responses.map( response => response[keyFn(failureMode)]).map( decodeFn ))));
		const data = {
			'Compromised': labels.map( label => numeric(compromisedTallies[label]) ),
			'Locked Out': labels.map( label => numeric(lockedTallies[label]) )
		}
		return {labels: [...labels], data};
	}

	const data = {
		emailAccount: decodeAndTallyResponses(AccountTypeQuestionList, (failureMode) => `${failureMode}-acct-type`, decodeAccountTypeQuestion),
		socialAccount: decodeAndTallyResponses(SocialAccountTypeQuestionList, (failureMode) => `${failureMode}-soc-type`, decodeSocialAccountTypeQuestion),
		financialAccount: decodeAndTallyResponses(FinancialAccountTypeQuestionList, (failureMode) => `${failureMode}-bank-type`, decodeFinancialAccountTypeQuestion),
	};
	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});


	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
		}export const data = ${JSON.stringify(data, undefined, "\t")};${"\n"}`);
};
