import { makePath } from "../../analysis-src/main.ts";
import { graphDeviceBarChart } from "../graphs/device-bar-chart.ts";
import { graphScenarioBarChart } from "../graphs/scenario-matching-question.ts";
import * as ScenarioMatching from "../../analysis-src/generated-data/Pilot6/graph-inputs/scenario-matching-question-data.ts";
import * as DeviceBarGraph from "../../analysis-src/generated-data/Pilot6/graph-inputs/device-bar-chart-data.ts";
import * as ScenarioRecency from "../../analysis-src/generated-data/Pilot6/graph-inputs/scenario-recency-data.ts";
import { graphScenarioRecencyBarChart } from "../graphs/recency-question.ts";

export const generatePilot6Graphs = () => {
	const cohort = "Pilot6";
	const outputPath = makePath(`./analysis-output/graphs/${cohort}`);
	graphScenarioBarChart(outputPath, ScenarioMatching.labels, ScenarioMatching.data);
	graphDeviceBarChart(outputPath, DeviceBarGraph.labels, DeviceBarGraph.data);
	graphScenarioRecencyBarChart(outputPath, ScenarioRecency.labels, ScenarioRecency.absoluteData);
}