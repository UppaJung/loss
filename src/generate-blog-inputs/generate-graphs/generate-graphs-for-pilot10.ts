import { makePath } from "../../analyze-survey-responses/main.ts";
import * as ScenarioMatching from "../../../generated-by-analysis/Pilot10/graph-inputs/scenario-matching-question-data.ts";
import * as DeviceBarChart from "../../../generated-by-analysis/Pilot10/graph-inputs/device-bar-chart-data.ts";
import * as ScenarioRecency from "../../../generated-by-analysis/Pilot10/graph-inputs/scenario-recency-data.ts";
import * as RecoveryDuration from "../../../generated-by-analysis/Pilot10/graph-inputs/recovery-duration-data.ts";
import * as ScenarioLikert from "../../../generated-by-analysis/Pilot10/graph-inputs/likert-data.ts";
import * as HarmScenarioLossDuration from "../../../generated-by-analysis/Pilot10/graph-inputs/harm-quantity-with-likert-severity-data.ts";
import * as HarmScenarioLikert from "../../../generated-by-analysis/Pilot10/graph-inputs/harm-focused-likert-data.ts";
import * as Age from "../../../generated-by-analysis/Pilot10/graph-inputs/age-data.ts";
import * as Demographics from "../../../generated-by-analysis/Pilot10/graph-inputs/demographics-data.ts";
import { data as AccountTypeData } from "../../../generated-by-analysis/Pilot10/graph-inputs/account-type-data.ts";
import { AnswerToMatchingQuestionList, AnswersIndicatingParticipantExperiencedScenario } from "../../analyze-survey-responses/decode-questions/matching-question.ts";
import { BarGraphs } from "../../../generated-by-analysis/Pilot10/graph-inputs/severity-grouped-bar-charts-data.ts";
import { graphCompromisedVsLockedOutSeverity } from "../graphs/compromised-vs-locked-severity-graphs.ts";
import { RecoveryDurationLabels } from "../../analyze-survey-responses/decode-questions/account.ts";
import { AnswerToRecencyQuestionList } from "../../analyze-survey-responses/decode-questions/recency-question.ts";
import { barChartWithSeverityLikertSubBarsSvg, barChartWithSubBarsSvg } from "../graphs/chart-svg.ts";
import { scatterPlotSvg } from "../graphs/scatter-plot-svg.ts";
import { SeverityColorsGreatestToLeast } from "../../analyze-survey-responses/generate/graph-data/common/likert.ts";
import { lineChartSvg } from "../graphs/chart-svg.ts";
import { barChartSvg } from "../graphs/chart-svg.ts";

export const generateGraphsPilot10 = (cohort: string = "Pilot10") => {
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
			//...(false ? {subBarColors: SeverityColorsLeastToGreatest} : {})
		}));
	});
	writeSvg('scatter-age-vs-scenario-count', scatterPlotSvg({
		xTitle: "Age",
		yTitle: "Number of Scenarios Matched",
		data: Age.ageScenarioScatterData,
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
		xAxisCategoryLabels: ScenarioRecency.labels, subBarCategories: AnswerToRecencyQuestionList, data: ScenarioRecency.absoluteData,
		subBarColors: SeverityColorsGreatestToLeast
	}));
	writeSvg(`scenario-recovery-duration-bar-chart`, barChartWithSubBarsSvg({
		xAxisCategoryLabels: RecoveryDuration.labels, subBarCategories: RecoveryDurationLabels, data: RecoveryDuration.absoluteData,
		subBarColors: SeverityColorsGreatestToLeast
	}));
	writeSvg(`scenario-harm-likert-absolute`, barChartWithSeverityLikertSubBarsSvg({
		yType: "absolute",
		xAxisCategoryLabels: ScenarioLikert.labels,
		data: ScenarioLikert.counts,
		xTitle: "Please rank the severity of the harm or loss on a scale of 1 (not harmful at all) to 7 (extremely harmful)?",
		yTitle: "Number of Participants",
	}))
	writeSvg(`scenario-harm-likert-percent-answered`, barChartWithSeverityLikertSubBarsSvg({
		yType: "percent",
		xAxisCategoryLabels: ScenarioLikert.labels,
		data: ScenarioLikert.percentsOfAnswered,
		xTitle: "Please rank the severity of the harm or loss on a scale of 1 (not harmful at all) to 7 (extremely harmful)?",
		yTitle: "Percent of Affected Participants",
	}));
	const topLabelBase = {
		type: 'label',
		yValue: 95,
		backgroundColor: 'rgba(245,245,245)',
		font: {
			size: 18
		}
	} as const;
	writeSvg(`scenario-harm-likert-percent`, barChartWithSeverityLikertSubBarsSvg({
		yType: "percent",
		xAxisCategoryLabels: ScenarioLikert.labels,
		data: ScenarioLikert.percentsOfResponses,
		xTitle: "Please rank the severity of the harm or loss on a scale of 1 (not harmful at all) to 7 (extremely harmful)?",
		yTitle: "Percent of Participants",
		chartOptions: {
			plugins:{
				annotation: {
					annotations: {
						label1: {
							...topLabelBase,
							xValue: "Locked Passwords",
							xAdjust: -320,
							content: ['                    Security Breach/Backfire Event Pairs                    '],
						},
						label2: {
							...topLabelBase,
							xValue: "Broken Promise",
							content: ['    Other Events    '],
						},
						label3: {
							...topLabelBase,
							xValue: "Lost Emails",
							content: ['        Harms        '],
						}
					}
				}
			}
		}
	}));
	writeSvg(`age-cdf`, lineChartSvg({
		xType: "linear",
		yType: "percent",
		hideLegend: true,
		xTitle: "Age (calendar years since birth)",
		datasets: [{
			data: Age.agePercentPoints,
		}],
		cdf: "accumulateRight",
	}));
	writeSvg(`education-percent`, barChartSvg({
		yType: "percent",
		hideLegend: true,
		xTitle: "Education",
		xAxisCategoryLabels: Demographics.education.labels,
		datasets: [{
			data: Demographics.educationPercent.data,
		}],
	}));
	writeSvg(`gender-percent`, barChartSvg({
		yType: "percent",
		hideLegend: true,
		xTitle: "Gender Identification",
		xAxisCategoryLabels: Demographics.gender.labels,
		datasets: [{
			data: Demographics.genderPercent.data,
		}],
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
