import { generateScenarioMatchingQuestionMacros } from "./data-macros/scenario-matching-question.ts";
import { getPathOfMostRecentInputTsvFile } from "./utilities/getPathOfMostRecentInputTsvFile.ts";
import { readQualtricsDataTabSeparatedNewLinesRemovedUTF16 } from "./utilities/readQualtricsDataTabSeparatedNewLinesRemovedUTF16.ts";
import { SurveyKey, augmentSurveyResponses } from "./SurveyResponse.ts";
import { generateLossStoryMarkdown } from "./markdown/loss-stories.ts";
import { generateSummaryStatistics } from "./data/summary-statistics.ts";
import { generateGraphData } from "./graph-data/index.ts";

const getResponsesFromMostRecentInputDataFile = async () => {
  const fileInfo = await getPathOfMostRecentInputTsvFile();
  const responses = (await readQualtricsDataTabSeparatedNewLinesRemovedUTF16(fileInfo.path)) as Record<SurveyKey, string>[];
  return {...fileInfo, responses};
}

export const makePath = (path: string) => {
	Deno.mkdirSync(path, { recursive: true, });
	return path.endsWith('/') ? path : `${path}/`;
};

const analyzeData = async () => {
  const {responses, baseName} = await getResponsesFromMostRecentInputDataFile();
  const finishedResponses = responses.filter(response => (response.Finished ?? "").toLocaleLowerCase() === "true");
  const augmentedSurveyResponses = augmentSurveyResponses(finishedResponses);;
  console.log(`Analyzing ${baseName} with ${finishedResponses.length} finished responses of ${responses.length} total.}`);

  const cohort = baseName;
  generateGraphData(cohort, augmentedSurveyResponses);
  
  const lumeDataPath = makePath(`analysis-src/generated-data/${cohort}/lume`);
  generateSummaryStatistics(lumeDataPath, augmentedSurveyResponses);
  const latexPath = makePath(`analysis-output/latex/${cohort}`);
  generateScenarioMatchingQuestionMacros(latexPath, augmentedSurveyResponses);
  
  const markdownPath = makePath(`analysis-src/generated-data/${cohort}/markdown`);
  generateLossStoryMarkdown(markdownPath, augmentedSurveyResponses);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await analyzeData();
}

