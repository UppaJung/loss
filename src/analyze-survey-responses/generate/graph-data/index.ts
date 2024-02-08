import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { makePath } from "../../main.ts";
import { accountTypeData } from "./account-type.ts";
import { graphDeviceBarChartData } from "./device-bar-chart.ts";
import { graphScenarioBarChartData } from "./scenario-matching-question.ts";
import { graphScenarioRecencyBarChartData } from "./scenario-recency.ts";
import { graphSeverityGroupedBarChartsData } from "./severity-grouped-bar-charts.ts";
import { SurveyKey } from "../../survey-keys/index.ts";
import { graphLikertBarChartData } from "./likert.ts";
import { graphRecoveryDonationBarChartData } from "./recovery-duration.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const generateGraphData = (cohort: string, augmentedSurveyResponses: AugmentedSurveyResponses<SurveyKey>) => {
	const graphDataPath = makePath(`generated-by-analysis/${cohort}/graph-inputs`);
  graphScenarioBarChartData(graphDataPath, augmentedSurveyResponses);
  graphDeviceBarChartData(graphDataPath, augmentedSurveyResponses);
  graphSeverityGroupedBarChartsData(graphDataPath, augmentedSurveyResponses);
  graphScenarioRecencyBarChartData(graphDataPath, augmentedSurveyResponses);
  graphRecoveryDonationBarChartData(graphDataPath, augmentedSurveyResponses);
  accountTypeData(graphDataPath, augmentedSurveyResponses);
  graphLikertBarChartData(graphDataPath, augmentedSurveyResponses);
}