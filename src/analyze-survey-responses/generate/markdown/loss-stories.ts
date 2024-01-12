import { SurveyKeys, AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { makeSafeForMarkdown } from "../../common/makeSafeForMarkdown.ts";

const {warningHeaderHtml, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

export const generateLossStoryMarkdown = (outPath: string, responses: AugmentedSurveyResponses) => {
		const losses = warningHeaderHtml + responses.map( 
			response => `### Participant ${response.participantId}${"\n"}` + [SurveyKeys.Loss1, SurveyKeys.Loss2, SurveyKeys.Loss3].map( (key, index) => 
				`${index + 1}. ${makeSafeForMarkdown(response[key])}${"\n"}`).join("\n")
		).join("\n");
    Deno.writeTextFileSync(`${outPath}/${codeFileNameWithoutExtension}.md`, losses);
  }
;
