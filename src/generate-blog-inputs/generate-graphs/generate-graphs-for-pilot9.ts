import { makePath } from "../../analyze-survey-responses/main.ts";
import * as ScenarioMatching from "../../../generated-by-analysis/Pilot9/graph-inputs/scenario-matching-question-data.ts";
import * as DeviceBarChart from "../../../generated-by-analysis/Pilot9/graph-inputs/device-bar-chart-data.ts";
import * as ScenarioRecency from "../../../generated-by-analysis/Pilot9/graph-inputs/scenario-recency-data.ts";
import * as RecoveryDuration from "../../../generated-by-analysis/Pilot9/graph-inputs/recovery-duration-data.ts";
import * as ScenarioLikert from "../../../generated-by-analysis/Pilot9/graph-inputs/likert-data.ts";
import * as HarmScenarioLossDuration from "../../../generated-by-analysis/Pilot9/graph-inputs/harm-quantity-with-likert-severity-data.ts";
import * as HarmScenarioLikert from "../../../generated-by-analysis/Pilot9/graph-inputs/harm-focused-likert-data.ts";
import * as AgeVsScenariosMatched from "../../../generated-by-analysis/Pilot9/graph-inputs/age-data.ts";
import { data as AccountTypeData } from "../../../generated-by-analysis/Pilot9/graph-inputs/account-type-data.ts";
import { AnswerToMatchingQuestionList, AnswersIndicatingParticipantExperiencedScenario } from "../../analyze-survey-responses/decode-questions/matching-question.ts";
import { BarGraphs } from "../../../generated-by-analysis/Pilot9/graph-inputs/severity-grouped-bar-charts-data.ts";
import { graphCompromisedVsLockedOutSeverity } from "../graphs/compromised-vs-locked-severity-graphs.ts";
import { RecoveryDurationLabels } from "../../analyze-survey-responses/decode-questions/account.ts";
import { AnswerToRecencyQuestionList } from "../../analyze-survey-responses/decode-questions/recency-question.ts";
import { barChartWithSeverityLikertSubBarsSvg, barChartWithSubBarsSvg } from "../graphs/chart-svg.ts";
import { scatterPlotSvg } from "../graphs/scatter-plot-svg.ts";

export const generateGraphsPilot9 = (cohort: string = "Pilot9") => {
	const outputPath = makePath(`./graphs/${cohort}`);
	const writeSvg = (name: string, svg: string) => Deno.writeTextFileSync(`${outputPath}${name}.svg`, svg);

	Object.entries(BarGraphs).forEach(([key, {labels, data, xTitle}]) => {
		// writeSvg(`${key}-bar-chart`, graphScenarioSeverity({
		// 	matchingQuestions: AnswersIndicatingParticipantExperiencedScenario, labels, data, xTitle,
		// }));
		writeSvg(`${key}-bar-chart`, barChartWithSubBarsSvg({
			xAxisCategoryLabels: labels,
			subBarCategories: AnswersIndicatingParticipantExperiencedScenario,
			data, xTitle,
		}));
	});
	writeSvg('scatter-age-vs-scenario-count', scatterPlotSvg({
		xTitle: "Age",
		yTitle: "Number of Scenarios Matched",
		data: AgeVsScenariosMatched.data,
	}));
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
	writeSvg(`scenario-recency-bar-chart`, barChartWithSubBarsSvg({
		xAxisCategoryLabels: ScenarioRecency.labels, subBarCategories: AnswerToRecencyQuestionList, data: ScenarioRecency.absoluteData
	}));
	writeSvg(`scenario-recovery-duration-bar-chart`, barChartWithSubBarsSvg({
		xAxisCategoryLabels: RecoveryDuration.labels, subBarCategories: RecoveryDurationLabels, data: RecoveryDuration.absoluteData
	}));
	writeSvg(`scenario-harm-likert-absolute`, barChartWithSeverityLikertSubBarsSvg({
		yType: "absolute",
		xAxisCategoryLabels: ScenarioLikert.labels,
		data: ScenarioLikert.counts,
		xTitle: "Please rank the severity of the harm or loss on a scale of 1 (not harmful at all) to 7 (extremely harmful)?",
		yTitle: "Number of Participants",
	}))
	writeSvg(`scenario-harm-likert-percent`, barChartWithSeverityLikertSubBarsSvg({
		yType: "percent",
		xAxisCategoryLabels: ScenarioLikert.labels,
		data: ScenarioLikert.percentsOfAnswered,
		xTitle: "Please rank the severity of the harm or loss on a scale of 1 (not harmful at all) to 7 (extremely harmful)?",
		yTitle: "Percent of Affected Participants",
	}));
	writeSvg(`lost-photos-percent`, barChartWithSeverityLikertSubBarsSvg({
		yType: "percent",
		xAxisCategoryLabels: HarmScenarioLossDuration.LostPhotos.labels,
		data: HarmScenarioLossDuration.LostPhotos.percentsOfResponses,
		xTitle: "Quantity of Photos/Videos Lost (as period of time)",
		yTitle: "Percent of Participants",
	}));
	writeSvg(`lost-emails-percent`, barChartWithSeverityLikertSubBarsSvg({
		yType: "percent",
		xAxisCategoryLabels: HarmScenarioLossDuration.LostEmails.labels,
		data: HarmScenarioLossDuration.LostEmails.percentsOfResponses,
		xTitle: "Quantity of Emails Lost (as period of time)",
		yTitle: "Percent of Participants",
	}));
	writeSvg(`lost-photos-percent-cdf`, barChartWithSeverityLikertSubBarsSvg({
		yType: "percent",
		cdf: "accumulateLeft",
		xAxisCategoryLabels: HarmScenarioLossDuration.LostPhotos.labels,
		data: HarmScenarioLossDuration.LostPhotos.percentsOfResponses,
		xTitle: "Quantity of Photos/Videos Lost (as period of time)",
		yTitle: "Percent of Participants (CDF)",
	}));
	writeSvg(`lost-emails-percent-cdf`, barChartWithSeverityLikertSubBarsSvg({
		yType: "percent",
		cdf: "accumulateLeft",
		xAxisCategoryLabels: HarmScenarioLossDuration.LostEmails.labels,
		data: HarmScenarioLossDuration.LostEmails.percentsOfResponses,
		xTitle: "Quantity of Emails Lost (as period of time)",
		yTitle: "Percent of Participants (CDF)",
	}));
	writeSvg(`harm-likert-absolute`, barChartWithSeverityLikertSubBarsSvg({
		yType: "absolute",
		xAxisCategoryLabels: HarmScenarioLikert.labels,
		data: HarmScenarioLikert.counts,
		xTitle: "Type of Data Lost",
		yTitle: "Number of Participants",
	}));
	writeSvg(`harm-likert-percent`, barChartWithSeverityLikertSubBarsSvg({
		yType: "percent",
		xAxisCategoryLabels: HarmScenarioLikert.labels,
		data: HarmScenarioLikert.percentsOfResponses,
		xTitle: "Type of Data Lost",
		yTitle: "Percent of Responses",
	}));
}

//HarmScenarioLossDuration
