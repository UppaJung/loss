import { makePath } from "../../analyze-survey-responses/main.ts";
import * as ScenarioMatching from "../../../generated-by-analysis/Pilot6/graph-inputs/scenario-matching-question-data.ts";
import * as DeviceBarChart from "../../../generated-by-analysis/Pilot6/graph-inputs/device-bar-chart-data.ts";
import * as ScenarioRecency from "../../../generated-by-analysis/Pilot6/graph-inputs/scenario-recency-data.ts";
import { data as AccountTypeData } from "../../../generated-by-analysis/Pilot6/graph-inputs/account-type-data.ts";
import { AnswerToMatchingQuestionList, AnswersIndicatingParticipantExperiencedScenario } from "../../analyze-survey-responses/decode-questions/matching-question.ts";
import { BarGraphs } from "../../../generated-by-analysis/Pilot6/graph-inputs/severity-grouped-bar-charts-data.ts";
import { graphCompromisedVsLockedOutSeverity } from "../graphs/compromised-vs-locked-severity-graphs.ts";
import { AnswerToRecencyQuestionList } from "../../analyze-survey-responses/decode-questions/recency-question.ts";
import { barChartWithSubBarsSvg } from "../graphs/chart-svg.ts";

export const generateGraphsPilot6 = (cohort: string = "Pilot6") => {
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
		...ScenarioMatching,
		xTitle: "Scenario",
		yTitle: "Percent of participants"
	}));
	writeSvg(`scenario-recency-bar-chart`, barChartWithSubBarsSvg({
		xAxisCategoryLabels: ScenarioRecency.labels, subBarCategories: AnswerToRecencyQuestionList, data: ScenarioRecency.absoluteData
	}));
};