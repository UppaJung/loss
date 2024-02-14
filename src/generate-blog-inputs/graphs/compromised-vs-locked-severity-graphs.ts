import { ChartOptions } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { AnswerToMatchQuestionColors, AnswerToMatchingQuestion } from "../../analyze-survey-responses/decode-questions/matching-question.ts";
import { ChartDataset } from "https://esm.sh/v128/chart.js@4.3.0/auto/auto.js";
import { barChartSvg } from "./bar-chart-svg.ts";



export const graphCompromisedVsLockedOutSeverity = <ANSWER extends AnswerToMatchingQuestion>({
	labels, data, yTitle = "Number of Participants", asPercentOf,
	matchingQuestions,
	colors = AnswerToMatchQuestionColors as Record<ANSWER, string>,
	...rest
}: {
	labels: string[],
	asPercentOf?: number,
	data: {
		'Compromised': Record<ANSWER, number[]>,
		'Locked Out': Record<ANSWER, number[]>
	}
	matchingQuestions: readonly ANSWER[],
	colors?: Record<ANSWER, string>,
	xTitle?: string,
	yTitle?: string,
	chartOptions: ChartOptions<"bar">
	}, 
): string => {
	const convert: (values: number[]) => number[] = asPercentOf != null ?
		values => values.map( n => 100 * n / asPercentOf) :
		values => values.map( n => n) ;
	const datasets = (['Compromised', 'Locked Out'] as const).map( (failureMode, index) =>
	matchingQuestions.map( experiencedScenario => ({
		stack: `stack ${index}`,
		data: convert(data[failureMode][experiencedScenario]),
		label: experiencedScenario,
		borderColor: colors[experiencedScenario],
		backgroundColor: colors[experiencedScenario],
	}))).flat() satisfies ChartDataset<"bar">[];
	return barChartSvg({
		datasets,
		xAxisCategoryLabels: labels,
		yTitle,
		yStacked: true,
		...rest
	});
};
