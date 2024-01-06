import { chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { ChartColors, transparentize } from "https://deno.land/x/fresh_charts@0.3.1/utils.ts";
import { decodeMatchingQuestion, MatchingScenariosLabelToId, AnswerToMatchingQuestionList } from "../decode-questions/matching-question.ts";
import { TotalAnswered, tallyResponses } from "../utilities/tallyResponses.ts";
import { filterNull } from "../utilities/filterNull.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphScenarioBarChart = (outPath: string, responses: Record<string, string>[]) => {

	const labels = MatchingScenariosLabelToId.map( ([label, ]) => label );
	const scenarioTallies = MatchingScenariosLabelToId.map( ([_, scenarioId]) => 
		tallyResponses(filterNull(responses.map(
			response => decodeMatchingQuestion(response[scenarioId])
	))));
	const datasets = AnswerToMatchingQuestionList.map( (answer, index) => {
		const sign = 1;// (index % 2) === 0 ? 1 : -1;
		const data = scenarioTallies.map( tally => 100 * sign * (tally[answer] ?? 0) / tally[TotalAnswered] );
		const color = [ChartColors.Red, ChartColors.Orange, ChartColors.Blue, "rgb(224 ,224 ,224)", "rgb(248, 248, 248)"][index];
		return {
			label: answer,
			data,
			borderColor: color,
			backgroundColor: transparentize(color, 0.5),
			// stack: `stack ${index}`,
		} as const;
	});
	// console.log(`datasets`, datasets);
	Deno.writeTextFileSync(`${outPath}scenario-bar-chart.svg`, chart({
		type: "bar", height: 400, width: 800,
		data: {
			labels, datasets,
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
