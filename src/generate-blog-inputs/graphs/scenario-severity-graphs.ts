import { ChartOptions, chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { AnswerToMatchQuestionColors, AnswerToMatchingQuestion } from "../../analyze-survey-responses/decode-questions/matching-question.ts";
import { ChartDataset } from "https://esm.sh/v128/chart.js@4.3.0/auto/auto.js";



export const graphScenarioSeverity = <ANSWER extends AnswerToMatchingQuestion>({
	labels, data, xTitle, yTitle = "Number of Participants", asPercentOf,
	matchingQuestions,
	colors = AnswerToMatchQuestionColors as Record<ANSWER, string>,
}: {
	labels: string[],
	asPercentOf?: number,
	data:  Record<ANSWER, number[]>,
	matchingQuestions: readonly ANSWER[],
	colors?: Record<ANSWER, string>,
	xTitle?: string,
	yTitle?: string,
	}, chartOptions: ChartOptions<"bar"> = {}
): string => {
	const convert: (values: number[]) => number[] = asPercentOf != null ?
		values => values.map( n => 100 * n / asPercentOf) :
		values => values.map( n => n) ;
	const datasets = matchingQuestions.map( experiencedScenario => ({
		stack: '0',
		data: convert(data[experiencedScenario]),
		label: experiencedScenario,
		borderColor: colors[experiencedScenario],
		backgroundColor: colors[experiencedScenario],
	})) satisfies ChartDataset<"bar">[];
	const previouslySeenSet = new Set<string>();
	const previouslySeen = (s: string): boolean => {
		const seen = previouslySeenSet.has(s);
		previouslySeenSet.add(s);
		return seen;
	}
	const options = {
		devicePixelRatio: 1,
		...chartOptions,
		plugins: {
			legend: {
				labels: {
					filter: function(legendItem) { return !previouslySeen(legendItem.text);	}
				}
			}
		},
		scales: {
			x: {
				type: 'category',
				position: 'bottom',
				title: {
					display: xTitle != null,
					font: {weight: "bold",},
					text: xTitle
				}
			},
			y: {
				type: "linear",
				beginAtZero: true, 
				stacked: true,
				...chartOptions.scales?.y,
				title: {
					display: yTitle != null,
					font: {
						weight: "bold",
					},
					text: yTitle,
					...chartOptions.scales?.y?.title,
				},
			} as NonNullable<ChartOptions<"bar">["scales"]>["y"],
		},
	} satisfies ChartOptions<"bar">;
	// console.log("Chart", {options, datasets});
	const svg = chart<"bar">({
		type: "bar", height: 600, width: 1200, options,
		data: {
			labels,
			datasets,
		},
	});
	return svg
		// Hack to remove textLength values that mess up x axis label
		.replaceAll(RegExp(`textLength="[\\d\\.]+"`, "g"), "");
};
