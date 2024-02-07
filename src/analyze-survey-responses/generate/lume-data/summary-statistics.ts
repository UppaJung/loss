import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { SurveyKeysPilot7 } from "../../survey-keys/index.ts";

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

export const generateSummaryStatistics = (outPath: string, responses: AugmentedSurveyResponses<SurveyKeysPilot7>) => {
		const data = {
			numberOfParticipants: responses.length,
		}
    Deno.writeTextFileSync(`${outPath}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
			}export const data = ${JSON.stringify(data, undefined, "\t")} as const;`);
  }
;
