import { ChartOptions, chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { AnswerToMatchQuestionColors, AnswerToMatchingQuestion } from "../../analyze-survey-responses/decode-questions/matching-question.ts";
import { ChartDataset } from "https://esm.sh/v128/chart.js@4.3.0/auto/auto.js";



export const graphCompromisedVsLockedOutSeverity = <ANSWER extends AnswerToMatchingQuestion>({
	labels, data, xTitle, yTitle = "Number of Participants", asPercentOf,
	matchingQuestions,
	colors = AnswerToMatchQuestionColors as Record<ANSWER, string>,
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
	}, chartOptions: ChartOptions<"bar"> = {}
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
//			...chartOptions.scales,
			// x0: {
			// 	stacked: true,
			// 	type: 'category',
			// 	position: 'bottom',
			// 	ticks: {
			// 		callback: function(_label: string | number, index: number) {
			// 			return index % 2 === 0 ? "Hacked" : "Locked";
			// 		}
			// 	}
			// },
			x: {
//				id: 'scenario',
				type: 'category',
				position: 'bottom',
				// ticks: {
				// 	major: {enabled: true},
				// 	callback: function(_label: string | number, index: number) {
				// 		// console.log(`called ticks ${label} ${index}`)
				// 		return index % 2 === 0 ? this.getLabelForValue(index) : undefined; // labels[index] : undefined;
				// 	}
				// },
				title: {
					display: xTitle != null,
					font: {weight: "bold",},
					text: xTitle
				}
			},
			y: {
				type: "linear",
				beginAtZero: true,
				ticks: {
					precision: 0,
				},
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
