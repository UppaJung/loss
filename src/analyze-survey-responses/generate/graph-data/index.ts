import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { makePath } from "../../main.ts";
import { accountTypeData } from "./account-type.ts";
import { graphDeviceBarChartData } from "./device-bar-chart.ts";
import { graphScenarioBarChartData } from "./scenario-matching-question.ts";
import { graphScenarioRecencyBarChartData } from "./scenario-recency.ts";
import { graphSeverityGroupedBarChartsData } from "./severity-grouped-bar-charts.ts";
import { SurveyKey } from "../../survey-keys/index.ts";
import { graphScenarioLikertBarChartData } from "./likert.ts";
import { graphRecoveryDurationBarChartData } from "./recovery-duration.ts";
import { getAgeScenariosMatchedScatterPlotData } from "./age.ts";
import { graphHarmScenarioLikertBarChartData } from "./harm-focused-likert.ts";
import { graphHarmQuantityWithLikertSeverity } from "./harm-quantity-with-likert-severity.ts";
import { generateDemographicGraphData } from "./demographics.ts";

export const generateGraphData = (cohort: string, augmentedSurveyResponses: AugmentedSurveyResponses<SurveyKey>) => {
	const graphDataPath = makePath(`generated-by-analysis/${cohort}/graph-inputs`);
  graphScenarioBarChartData(graphDataPath, augmentedSurveyResponses);
  graphDeviceBarChartData(graphDataPath, augmentedSurveyResponses);
  graphSeverityGroupedBarChartsData(graphDataPath, augmentedSurveyResponses);
  graphScenarioRecencyBarChartData(graphDataPath, augmentedSurveyResponses);
  graphRecoveryDurationBarChartData(graphDataPath, augmentedSurveyResponses);
  accountTypeData(graphDataPath, augmentedSurveyResponses);
  graphScenarioLikertBarChartData(graphDataPath, augmentedSurveyResponses);
  graphHarmScenarioLikertBarChartData(graphDataPath, augmentedSurveyResponses);
  graphHarmQuantityWithLikertSeverity(graphDataPath, augmentedSurveyResponses);
  getAgeScenariosMatchedScatterPlotData(graphDataPath, augmentedSurveyResponses);
  generateDemographicGraphData(graphDataPath, augmentedSurveyResponses);
}