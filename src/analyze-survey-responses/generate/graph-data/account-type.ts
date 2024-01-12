import { tallyResponses } from "../../common/tallyResponses.ts";
import { filterNull } from "../../common/filterNull.ts";
import type { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { AccountTypeQuestionList, SocialAccountTypeQuestionList, decodeAccountTypeQuestion, decodeSocialAccountTypeQuestion } from "../../decode-questions/account-type.ts";

export const accountTypeData = (path: string, responses: AugmentedSurveyResponses) => {

	const [hackedEmailTallies, lockedEmailTallies] = (["hacked", "locked"] as const).map( failureMode => 
		tallyResponses(filterNull(responses.map( response => 
			decodeAccountTypeQuestion(response[`${failureMode}-acct-type`]))))
	);

	const emailLabels = [...AccountTypeQuestionList];
	const emailData = {
		'compromised': emailLabels.map( label => hackedEmailTallies[label] ?? 0 ),
		'lockedOut': emailLabels.map( label => lockedEmailTallies[label] ?? 0 )
	};

	const [hackedSocialTallies, lockedSocialTallies] = (["hacked", "locked"] as const).map( failureMode => 
		tallyResponses(filterNull(responses.map( response => 
			decodeSocialAccountTypeQuestion(response[`${failureMode}-soc-type`]))))
	);

	const socialLabels = [...SocialAccountTypeQuestionList];
	const socialData = {
		'compromised': socialLabels.map( label => hackedSocialTallies[label] ?? 0 ),
		'lockedOut': socialLabels.map( label => lockedSocialTallies[label] ?? 0 )
	};

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
		}export const emailAccount = {${"\n\t"
			}labels: ${JSON.stringify(emailLabels, undefined, "\t\t")}${",\n\t"
			}data: ${JSON.stringify(emailData, undefined, "\t\t")}${"};\n\n"
		}export const socialAccount = {${"\n\t"
		}labels: ${JSON.stringify(socialLabels, undefined, "\t\t")}${",\n\t"
		}data: ${JSON.stringify(socialData, undefined, "\t\t")}${"};\n\n"
	}`);
};
