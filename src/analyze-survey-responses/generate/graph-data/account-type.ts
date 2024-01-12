import { TotalAnswered, tallyResponses } from "../../common/tallyResponses.ts";
import { filterNull } from "../../common/filterNull.ts";
import type { AugmentedSurveyResponses, SurveyKey } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { AccountTypeQuestionList, FinancialAccountTypeQuestionList, SocialAccountTypeQuestionList, decodeAccountTypeQuestion, decodeFinancialAccountTypeQuestion, decodeSocialAccountTypeQuestion } from "../../decode-questions/account-type.ts";
import { numeric } from "../../common/numeric.ts";
import { AnswerIndicatingMatch, AnswersIndicatingMatch, decodeMatchingQuestion } from "../../decode-questions/matching-question.ts";
 
export const accountTypeData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {
	// const decodeAndTallyResponses = <LABEL extends string>(key: SurveyKey, decodeFn: (answer: string) => LABEL | undefined): Partial<Record<LABEL, number>> =>
	// 	tallyResponses(filterNull(responses.map( response => response[key]).map( decodeFn )));

	const decodeAndTallyResponses = <LABEL extends string>(labels: readonly LABEL[], accountType: 'acct' | 'soc' | 'bank', decodeFn: (answer: string) => LABEL | undefined) => {
		const [compromisedTallies, lockedTallies] = (
			(["hacked", "locked"] as const).map( failureMode => 
				Object.fromEntries(AnswersIndicatingMatch.map( match => (
					[
						match,
						tallyResponses(filterNull(
							responses.filter( response => decodeMatchingQuestion(response[`${failureMode}-${accountType}`]) === match )
							.map( response => response[`${failureMode}-${accountType}-type`]).map( decodeFn )))
					]
				 ))) as Record<AnswerIndicatingMatch, Partial<Record<LABEL | TotalAnswered, number>>>
			));
		const data = Object.fromEntries(
			AnswersIndicatingMatch.map( match => ([
				match,
					labels.map( label =>  ([
							numeric(compromisedTallies[match][label]),
							numeric(lockedTallies[match][label]),
						])).flat()
				])) ) as Record<AnswerIndicatingMatch, number[]>;
		return {labels: [...labels.map( l => [l, l])].flat(), data};
	}

	const data = {
		emailAccount: decodeAndTallyResponses(AccountTypeQuestionList, `acct`, decodeAccountTypeQuestion),
		socialAccount: decodeAndTallyResponses(SocialAccountTypeQuestionList, `soc`, decodeSocialAccountTypeQuestion),
		financialAccount: decodeAndTallyResponses(FinancialAccountTypeQuestionList, `bank`, decodeFinancialAccountTypeQuestion),
	};
	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});


	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
		}export const data = ${JSON.stringify(data, undefined, "\t")};${"\n"}`);
};
