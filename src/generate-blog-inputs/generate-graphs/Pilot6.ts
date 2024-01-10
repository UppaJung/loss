import { makePath } from "../../analyze-survey-responses/main.ts";
import { graphDeviceBarChart } from "../graphs/device-bar-chart.ts";
import { graphScenarioBarChart } from "../graphs/scenario-matching-question.ts";
import * as ScenarioMatching from "../../../generated-by-analysis/Pilot6/graph-inputs/scenario-matching-question-data.ts";
import * as DeviceBarGraph from "../../../generated-by-analysis/Pilot6/graph-inputs/device-bar-chart-data.ts";
import * as ScenarioRecency from "../../../generated-by-analysis/Pilot6/graph-inputs/scenario-recency-data.ts";
import * as AccountTypeData from "../../../generated-by-analysis/Pilot6/graph-inputs/account-type-data.ts";
import { graphScenarioRecencyBarChart } from "../graphs/recency-question.ts";
import { graphAccountTypeBarChart } from "../graphs/account-type-bar-chart.ts";

export const generatePilot6Graphs = () => {
	const cohort = "Pilot6";
	const outputPath = makePath(`./graphs/${cohort}`);
	graphAccountTypeBarChart(outputPath, AccountTypeData.labels, AccountTypeData.data);
	graphScenarioBarChart(outputPath, ScenarioMatching.labels, ScenarioMatching.data);
	graphDeviceBarChart(outputPath, DeviceBarGraph.labels, DeviceBarGraph.data);
	graphScenarioRecencyBarChart(outputPath, ScenarioRecency.labels, ScenarioRecency.absoluteData);
}