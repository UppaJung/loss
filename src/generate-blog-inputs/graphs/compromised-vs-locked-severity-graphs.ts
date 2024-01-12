import { ChartOptions, chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { AnswerIndicatingMatch, AnswerToMatchQuestionColors, AnswerToMatchingQuestion } from "../../analyze-survey-responses/decode-questions/matching-question.ts";

export const graphCompromisedVsLockedOutSeverity = ({labels, data, xTitle, yTitle = "Number of Participants"}: {
	labels: string[],
	data: Record<AnswerIndicatingMatch, number[]>
	xTitle?: string,
	yTitle?: string,
	}, chartOptions: ChartOptions<"bar"> = {}) => {
	const datasets =	[{
		data: data[AnswerToMatchingQuestion.MatchedTopThree],
		label: AnswerToMatchingQuestion.MatchedTopThree,
		borderColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.MatchedTopThree],
		backgroundColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.MatchedTopThree],
	},
	{
		data: data[AnswerToMatchingQuestion.AddToTopThree],
		label: AnswerToMatchingQuestion.AddToTopThree,
		borderColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.AddToTopThree],
		backgroundColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.AddToTopThree],
	},
	{
		data: data[AnswerToMatchingQuestion.BelowTopThree],
		label: AnswerToMatchingQuestion.BelowTopThree,
		borderColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.BelowTopThree],
		backgroundColor: AnswerToMatchQuestionColors[AnswerToMatchingQuestion.BelowTopThree],
	}];
	const options = {
		devicePixelRatio: 1,
		...chartOptions,
		scales: {
//			...chartOptions.scales,
			x: {
				stacked: true,
				type: 'category',
				position: 'bottom',
				ticks: {
					callback: function(_label: string | number, index: number) {
						return index % 2 === 0 ? "Compromised" : "Locked Out";
					}
				}
			},
			x2: {
//				id: 'scenario',
				type: 'category',
				position: 'bottom',
				ticks: {
					callback: function(label: string | number, index: number) {
						console.log(`called ticks ${label} ${index}`)
						return index % 2 === 0 ? labels[index] : "";
					}
				},
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
	console.log("Chart", {options, datasets});
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
