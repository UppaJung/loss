import { generateScenarioMatchingQuestionMacros } from "./generate/latex-data-macros/scenario-matching-question.ts";
import { getPathOfMostRecentInputTsvFile } from "./common/getPathOfMostRecentInputTsvFile.ts";
import { readQualtricsDataTabSeparatedNewLinesRemovedUTF16 } from "./common/readQualtricsDataTabSeparatedNewLinesRemovedUTF16.ts";
import { SurveyKey, SurveyKeys, augmentSurveyResponses } from "./survey-keys/index.ts";
import { generateLossStoryMarkdown } from "./generate/markdown/loss-stories.ts";
import { generateSummaryStatistics } from "./generate/lume-data/summary-statistics.ts";
import { generateGraphData } from "./generate/graph-data/index.ts";
import { generateFreeTextMacros } from "./generate/lume-data/free-text.ts";
import { responseIdsToRemove } from "./generate/graph-data/data-adjustments.ts";

const getResponsesFromMostRecentInputDataFile = async () => {
  const fileInfo = await getPathOfMostRecentInputTsvFile();
  const responses = (await readQualtricsDataTabSeparatedNewLinesRemovedUTF16(fileInfo.path)) as Record<SurveyKey, string>[];
  return {...fileInfo, responses};
}

/**
 * Ensure that a file path exists before writing files to it.
 * @param path 
 * @returns The path string, guaranteed to have a trailing slash (`/`).
 */
export const makePath = (path: string) => {
	Deno.mkdirSync(path, { recursive: true, });
	return path.endsWith('/') ? path : `${path}/`;
};

const analyzeCohort = (responses: Record<SurveyKey, string>[], cohort: string) => {
  // Filter out unfinished responses
  const finishedResponses = responses.filter(response => (response.Finished ?? "").toLocaleLowerCase() === "true");

  // Filter out bogus responses
  const filteredResponses = finishedResponses.filter(response =>
    !responseIdsToRemove.has(response[SurveyKeys.ResponseId]));
  const numberFiltered = finishedResponses.length - filteredResponses.length;
  console.log(`Removed ${numberFiltered} responses deemed invalid.`)

  // Augment responses with participantId and startDate
  const augmentedSurveyResponses = augmentSurveyResponses(filteredResponses);

  console.log(`Analyzing ${cohort} with ${filteredResponses.length} finished responses of ${responses.length} total.`);

  // Generate data for graphs (which are generated later, outside of git tracked data, so as not to pollute the git repository)
  generateGraphData(cohort, augmentedSurveyResponses);
  
  // Generate data that can be imported into lume blog/markdown/website materials
  const lumeDataPath = makePath(`generated-by-analysis/${cohort}/lume`);
  generateSummaryStatistics(lumeDataPath, augmentedSurveyResponses);
  generateFreeTextMacros(lumeDataPath, augmentedSurveyResponses);

  // Generate markdown files that can be imported
  const markdownPath = makePath(`generated-by-analysis/${cohort}/markdown`);
  generateLossStoryMarkdown(markdownPath, augmentedSurveyResponses);

  // Generate markdown files with prolific IDs that must not be committed
  // to the public repository
  const privatePath = makePath(`analysis-output-private/${cohort}/markdown`);
  generateLossStoryMarkdown(privatePath, augmentedSurveyResponses, {includeProlificIds: true});
  
  // Generate latex macros
  const latexPath = makePath(`generated-by-analysis/${cohort}/latex`);
  generateScenarioMatchingQuestionMacros(latexPath, augmentedSurveyResponses);
  
}

const analyzeMostRecentTsv = async () => {
  // Get responses
  const {responses, baseName} = await getResponsesFromMostRecentInputDataFile();
  analyzeCohort(responses, baseName);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await analyzeMostRecentTsv();
}

