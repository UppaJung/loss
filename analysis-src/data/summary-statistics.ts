import { AugmentedSurveyResponses } from "../SurveyResponse.ts";
import { getReflectedCodeFileInfo } from "../utilities/getReflectedCodeFileInfo.ts";

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

export const generateSummaryStatistics = (outPath: string, responses: AugmentedSurveyResponses) => {
		const data = {
			numberOfParticipants: responses.length,
		}
    Deno.writeTextFileSync(`${outPath}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
			}export const data = ${JSON.stringify(data, undefined, "\t")} as const;`);
  }
;
