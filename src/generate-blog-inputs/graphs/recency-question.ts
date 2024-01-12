import { chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { ChartColors, transparentize } from "https://deno.land/x/fresh_charts@0.3.1/utils.ts";
import { AnswerToRecencyQuestionLabels, AnswerToRecencyQuestionList } from "../../analyze-survey-responses/decode-questions/recency-question.ts";

export const graphScenarioRecencyBarChart = (labels: string[], data: Record<AnswerToRecencyQuestionLabels, readonly number[]>) => {
	const datasets = AnswerToRecencyQuestionList.map( (answer, index) => {
		const color = [ChartColors.Red, ChartColors.Orange, ChartColors.Blue, ChartColors.Green, ChartColors.Purple, ChartColors.Grey][index];
		return {
			label: answer,
			data: data[answer],
			borderColor: color,
			backgroundColor: transparentize(color, 0.5),
			// stack: `stack ${index}`,
		} as const;
	});
	return chart({
		type: "bar", height: 600, width: 1200,
		data: {
			labels: labels, datasets,
		},
		options: {
			devicePixelRatio: 1,
			scales: {
				x: { stacked: true },
				y: { beginAtZero: true, stacked: true }
			},
		},
	});
};
