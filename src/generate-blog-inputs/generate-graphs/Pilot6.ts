import { makePath } from "../../analyze-survey-responses/main.ts";
import { graphScenarioBarChart } from "../graphs/scenario-matching-question.ts";
import * as ScenarioMatching from "../../../generated-by-analysis/Pilot6/graph-inputs/scenario-matching-question-data.ts";
import * as DeviceBarGraph from "../../../generated-by-analysis/Pilot6/graph-inputs/device-bar-chart-data.ts";
import * as ScenarioRecency from "../../../generated-by-analysis/Pilot6/graph-inputs/scenario-recency-data.ts";
import * as AccountTypeData from "../../../generated-by-analysis/Pilot6/graph-inputs/account-type-data.ts";
import { graphScenarioRecencyBarChart } from "../graphs/recency-question.ts";
import { graphCompromisedVsLockedOut } from "../graphs/compromised-vs-locked-graphs.ts";


export const generateGraphs = (cohort: string = "Pilot6") => {
	const outputPath = makePath(`./graphs/${cohort}`);
	const writeSvg = (name: string, svg: string) => Deno.writeTextFileSync(`${outputPath}${name}.svg`, svg);

	writeSvg(`device-bar-chart`, graphCompromisedVsLockedOut({
		labels: DeviceBarGraph.labels, data: DeviceBarGraph.data, xTitle: "Device Type",
	}));
	writeSvg(`account-type-bar-chart`, graphCompromisedVsLockedOut({
		...AccountTypeData.emailAccount, xTitle: "Account Type",}));
	writeSvg(`social-account-type-bar-chart`, graphCompromisedVsLockedOut({
		...AccountTypeData.socialAccount, xTitle: "Social Account Type",}));
	writeSvg(`financial-account-type-bar-chart`, graphCompromisedVsLockedOut({
		...AccountTypeData.financialAccount,xTitle: "Financial Account Type",}));
	writeSvg(`scenario-bar-chart`, graphScenarioBarChart(ScenarioMatching.labels, ScenarioMatching.data));
	writeSvg(`scenario-recency-bar-chart`, graphScenarioRecencyBarChart(ScenarioRecency.labels, ScenarioRecency.absoluteData));
}