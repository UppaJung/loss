import { chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { AnswerToMatchingQuestionList } from "../../analyze-survey-responses/decode-questions/matching-question.ts";
import type { AnswerToMatchingQuestion } from "../../analyze-survey-responses/decode-questions/matching-question.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphScenarioBarChart = (outputPath: string, labels: string[], data: Record<AnswerToMatchingQuestion, readonly number[]>) => {
	const datasets = AnswerToMatchingQuestionList.map( (answer, index) => {
		const color = ["rgb(196,0,0)", "rgb(224,148,0)", "rgb(180 ,180 ,224)", "rgb(224, 224 ,224)", "rgb(248, 248, 248)"][index];
		return {
			label: answer,
			data: data[answer],
			// borderColor: color,
			backgroundColor: color,
			// stack: `stack ${index}`,
		} as const;
	});
	Deno.writeTextFileSync(`${outputPath}/scenario-bar-chart.svg`, chart({
		type: "bar", height: 600, width: 1200,
		data: {
			labels: labels, datasets,
		},
		options: {
			devicePixelRatio: 1,
			scales: {
				x: { stacked: true },
				y: { beginAtZero: true, stacked: true, max: 100 }
			},
		},
	}));
};
