import { ChartOptions, chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { AnswerIndicatingMatch, AnswerToMatchQuestionColors, AnswerToMatchingQuestion } from "../../analyze-survey-responses/decode-questions/matching-question.ts";
import { ChartDataset } from "https://esm.sh/v128/chart.js@4.3.0/auto/auto.js";

const numberOfTimesStringPreviouslySeenObject: Record<string, number> = {};
const numberOfTimesStringPreviouslySeen = (s: string): number => {
	const result = numberOfTimesStringPreviouslySeenObject[s] ?? 0;
	numberOfTimesStringPreviouslySeenObject[s] = result + 1;
	return result;
}

export const graphCompromisedVsLockedOutSeverity = ({labels, data, xTitle, yTitle = "Number of Participants"}: {
	labels: string[],
	data: Record<AnswerIndicatingMatch, {'Compromised': number[], 'Locked Out': number[]}>
	xTitle?: string,
	yTitle?: string,
	}, chartOptions: ChartOptions<"bar"> = {}) => {
	const datasets =	[{
		stack: "stack 0",
		data: data[AnswerToMatchingQuestion.MatchedTopThree].Compromised,
		label: AnswerToMatchingQuestion.MatchedTopThree,
		borderColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.MatchedTopThree],
		backgroundColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.MatchedTopThree],
	},
	{
		stack: "stack 0",
		data: data[AnswerToMatchingQuestion.AddToTopThree].Compromised,
		label: AnswerToMatchingQuestion.AddToTopThree,
		borderColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.AddToTopThree],
		backgroundColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.AddToTopThree],
	},
	{
		stack: "stack 0",
		data: data[AnswerToMatchingQuestion.BelowTopThree].Compromised,
		label: AnswerToMatchingQuestion.BelowTopThree,
		borderColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.BelowTopThree],
		backgroundColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.BelowTopThree],
	}, {
		stack: "stack 1",
		data: data[AnswerToMatchingQuestion.MatchedTopThree]["Locked Out"],
		label: AnswerToMatchingQuestion.MatchedTopThree,
		borderColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.MatchedTopThree],
		backgroundColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.MatchedTopThree],
	},
	{
		stack: "stack 1",
		data: data[AnswerToMatchingQuestion.AddToTopThree]["Locked Out"],
		label: AnswerToMatchingQuestion.AddToTopThree,
		borderColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.AddToTopThree],
		backgroundColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.AddToTopThree],
	},
	{
		stack: "stack 1",
		data: data[AnswerToMatchingQuestion.BelowTopThree]["Locked Out"],
		label: AnswerToMatchingQuestion.BelowTopThree,
		borderColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.BelowTopThree],
		backgroundColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.BelowTopThree],
	}] satisfies ChartDataset<"bar">[];
	const options = {
		devicePixelRatio: 1,
		...chartOptions,
		plugins: {
			legend: {
				labels: {
					filter: function(legendItem) {
						return (numberOfTimesStringPreviouslySeen(legendItem.text) % 2) === 0;
					}
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
