import { tallyResponses } from "../utilities/tallyResponses.ts";
import { filterNull } from "../utilities/filterNull.ts";
import type { AugmentedSurveyResponses } from "../SurveyResponse.ts";
import { getReflectedCodeFileInfo } from "../utilities/getReflectedCodeFileInfo.ts";
import { AccountTypeQuestionList, decodeAccountTypeQuestion } from "../decode-questions/account-type.ts";

// const RANGE = {count: 3, min: -30, max: 30};
export const accountTypeData = (path: string, responses: AugmentedSurveyResponses) => {

	const tallyScenario = (scenario: "hacked" | "locked") => tallyResponses(filterNull(responses.map( response => 
		decodeAccountTypeQuestion(response[`${scenario}-acct-type`]))));

	const [hackedTallies, lockedTallies] = (["hacked", "locked"] as const).map( tallyScenario );

	const labels = [...AccountTypeQuestionList];
	const data = {
		'Hacked': labels.map( label => hackedTallies[label] ?? 0 ),
		'Locked': labels.map( label => lockedTallies[label] ?? 0 )
	};

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
	}export const labels = ${JSON.stringify(labels, undefined, "\t")};${"\n"
	}export const data = ${JSON.stringify(data, undefined, "\t")} as const;`);
};