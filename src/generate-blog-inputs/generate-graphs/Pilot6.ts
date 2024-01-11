import { makePath } from "../../analyze-survey-responses/main.ts";
import { graphScenarioBarChart } from "../graphs/scenario-matching-question.ts";
import * as ScenarioMatching from "../../../generated-by-analysis/Pilot6/graph-inputs/scenario-matching-question-data.ts";
import * as DeviceBarGraph from "../../../generated-by-analysis/Pilot6/graph-inputs/device-bar-chart-data.ts";
import * as ScenarioRecency from "../../../generated-by-analysis/Pilot6/graph-inputs/scenario-recency-data.ts";
import * as AccountTypeData from "../../../generated-by-analysis/Pilot6/graph-inputs/account-type-data.ts";
import { graphScenarioRecencyBarChart } from "../graphs/recency-question.ts";
import { graphCompromisedVsLockedOut } from "../graphs/compromised-vs-locked-graphs.ts";

export const generatePilot6Graphs = () => {
	const cohort = "Pilot6";
	const outputPath = makePath(`./graphs/${cohort}`);
	Deno.writeTextFileSync(`${outputPath}/device-bar-chart.svg`,
		graphCompromisedVsLockedOut({
			labels: DeviceBarGraph.labels, data: DeviceBarGraph.data,
			xTitle: "Device Type",
		}));
	Deno.writeTextFileSync(`${outputPath}/account-type-bar-chart.svg`,
		graphCompromisedVsLockedOut({
			...AccountTypeData.emailAccount,
			xTitle: "Account Type",}));
			Deno.writeTextFileSync(`${outputPath}/social-account-type-bar-chart.svg`,
			graphCompromisedVsLockedOut({
				...AccountTypeData.socialAccount,
				xTitle: "Social Account Type",}));
		graphScenarioBarChart(outputPath, ScenarioMatching.labels, ScenarioMatching.data);
	graphScenarioRecencyBarChart(outputPath, ScenarioRecency.labels, ScenarioRecency.absoluteData);
}