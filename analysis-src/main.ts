import { generateScenarioMatchingQuestionMacros } from "./data-macros/scenario-matching-question.ts";
import { getPathOfMostRecentInputTsvFile } from "./utilities/getPathOfMostRecentInputTsvFile.ts";
import { graphScenarioBarChart } from "./graphs/scenario-matching-question.ts";
import { readQualtricsDataTabSeparatedNewLinesRemovedUTF16 } from "./utilities/readQualtricsDataTabSeparatedNewLinesRemovedUTF16.ts";
import { graphDeviceBarChart } from "./graphs/hacked-device.ts";

const getResponsesFromMostRecentInputDataFile = async () => {
  const fileInfo = await getPathOfMostRecentInputTsvFile();
  const responses = await readQualtricsDataTabSeparatedNewLinesRemovedUTF16(fileInfo.path);
  return {...fileInfo, responses};
}

export const makePath = (path: string) => {
	Deno.mkdirSync(path, { recursive: true, });
	return path.endsWith('/') ? path : `${path}/`;
};

const analyzeData = async () => {
  const {responses, baseName} = await getResponsesFromMostRecentInputDataFile();
  console.log(`Analyzing ${baseName}`);
  const latexPath = makePath(`analysis-output/${baseName}/latex`);
  generateScenarioMatchingQuestionMacros(latexPath, responses);
  const graphPath = makePath(`analysis-output/${baseName}/graphs`);
  graphScenarioBarChart(graphPath, responses);
  graphDeviceBarChart(graphPath, responses);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await analyzeData();
}

