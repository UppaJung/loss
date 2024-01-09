import { AugmentedSurveyResponses } from "../SurveyResponse.ts";
import { makePath } from "../main.ts";
import { graphDeviceBarChartData } from "./device-bar-chart.ts";
import { graphScenarioBarChartData } from "./scenario-matching-question.ts";
import { graphScenarioRecencyBarChartData } from "./scenario-recency.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const generateGraphData = (cohort: string, augmentedSurveyResponses: AugmentedSurveyResponses) => {
	const graphDataPath = makePath(`generated-by-analysis/${cohort}/graph-inputs`);
  graphScenarioBarChartData(graphDataPath, augmentedSurveyResponses);
  graphDeviceBarChartData(graphDataPath, augmentedSurveyResponses);
  graphScenarioRecencyBarChartData(graphDataPath, augmentedSurveyResponses);
}