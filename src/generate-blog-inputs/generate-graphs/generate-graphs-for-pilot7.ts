import { makePath } from "../../analyze-survey-responses/main.ts";
import * as ScenarioMatching from "../../../generated-by-analysis/Pilot7/graph-inputs/scenario-matching-question-data.ts";
import * as DeviceBarChart from "../../../generated-by-analysis/Pilot7/graph-inputs/device-bar-chart-data.ts";
import * as ScenarioRecency from "../../../generated-by-analysis/Pilot7/graph-inputs/scenario-recency-data.ts";
import * as ScenarioLikert from "../../../generated-by-analysis/Pilot7/graph-inputs/likert-data.ts";
import { data as AccountTypeData } from "../../../generated-by-analysis/Pilot7/graph-inputs/account-type-data.ts";
import { graphScenarioRecencyBarChart } from "../graphs/recency-question.ts";
import { graphScenarioSeverity } from "../graphs/scenario-severity-graphs.ts";
import { AnswerToMatchingQuestionList, AnswersIndicatingParticipantExperiencedScenario } from "../../analyze-survey-responses/decode-questions/matching-question.ts";
import { BarGraphs } from "../../../generated-by-analysis/Pilot7/graph-inputs/severity-grouped-bar-charts-data.ts"
import { graphCompromisedVsLockedOutSeverity } from "../graphs/compromised-vs-locked-severity-graphs.ts";
import { graphScenarioLikert } from "../graphs/graph-scenario-likert.ts";

export const generateGraphsPilot7 = (cohort: string = "Pilot7") => {
	const outputPath = makePath(`./graphs/${cohort}`);
	const writeSvg = (name: string, svg: string) => Deno.writeTextFileSync(`${outputPath}${name}.svg`, svg);

	Object.entries(BarGraphs).forEach(([key, {labels, data, xTitle}]) => {
		writeSvg(`${key}-bar-chart`, graphScenarioSeverity({
			matchingQuestions: AnswersIndicatingParticipantExperiencedScenario, labels, data, xTitle,
		}));
	});
	writeSvg(`device-bar-chart`, graphCompromisedVsLockedOutSeverity({
		matchingQuestions: AnswersIndicatingParticipantExperiencedScenario,
		labels: DeviceBarChart.labels,
		data: DeviceBarChart.data, 
		xTitle: "Device Type",
	}));
	writeSvg(`account-type-bar-chart`, graphCompromisedVsLockedOutSeverity({
		matchingQuestions: AnswersIndicatingParticipantExperiencedScenario,
		...AccountTypeData.emailAccount, 
		xTitle: "Account Type"
	}));
	writeSvg(`social-account-type-bar-chart`, graphCompromisedVsLockedOutSeverity({
		matchingQuestions: AnswersIndicatingParticipantExperiencedScenario,
		...AccountTypeData.socialAccount, 
		xTitle: "Social Account Type"
	}));
	writeSvg(`financial-account-type-bar-chart`, graphCompromisedVsLockedOutSeverity({
		matchingQuestions: AnswersIndicatingParticipantExperiencedScenario,
		...AccountTypeData.financialAccount,
		xTitle: "Financial Account Type"
	}));
	writeSvg(`scenario-bar-chart`, graphCompromisedVsLockedOutSeverity({
		matchingQuestions: AnswerToMatchingQuestionList,
		labels: [...ScenarioMatching.pairedScenarioLabels, ...ScenarioMatching.unpairedScenarioLabels],
		data: {
			"Compromised": ScenarioMatching.compromisedAndUnpairedScenarioData,
			"Locked Out": ScenarioMatching.lockedOutScenarioData,
		}, 
		xTitle: "Scenario",
		yTitle: "Percent of participants",
	}));
	writeSvg(`scenario-recency-bar-chart`, graphScenarioRecencyBarChart(ScenarioRecency.labels, ScenarioRecency.absoluteData));
	writeSvg(`scenario-harm-likert`, graphScenarioLikert({
		labels: ScenarioLikert.labels,
		data: ScenarioLikert.percents,
		xTitle: "Please rank the severity of the harm or loss on a scale of 1 (not harmful at all) to 7 (extremely harmful)?",
		yTitle: "Percent of Affected Participants",
	}))
}
