import { makePath } from "../../analysis-src/main.ts";
import { graphDeviceBarChart } from "../graphs/device-bar-chart.ts";
import { graphScenarioBarChart } from "../graphs/scenario-matching-question.ts";
import * as ScenarioMatching from "../../analysis-src/generated-data/Pilot6/graph-inputs/scenario-matching-question-bar-graph-inputs.ts";
import * as DeviceBarGraph from "../../analysis-src/generated-data/Pilot6/graph-inputs/device-bar-graph-inputs.ts";

export const generatePilot6Graphs = () => {
	const cohort = "Pilot6";
	const outputPath = makePath(`./analysis-output/graphs/${cohort}`);
	graphScenarioBarChart(outputPath, ScenarioMatching.labels, ScenarioMatching.data);
	graphDeviceBarChart(outputPath, DeviceBarGraph.labels, DeviceBarGraph.data);
}