import { ChartOptions, chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";

import { ChartDataset } from "https://esm.sh/v128/chart.js@4.3.0/auto/auto.js";
import { LikertLabel, LikertLabels } from "../../analyze-survey-responses/generate/graph-data/likert.ts";


export const LikertColors = LikertLabels.reduce( (r, label) => {
	const shade = 210 - 25 * parseInt(label);
	r[label] = `rgb(${shade},${shade},${shade})`;
	return r;
}, {} as Record<LikertLabel, string>);

export const graphScenarioLikert = ({
	labels,
	data,
	xTitle,
	yTitle = "Percent of Participants",
	colors = LikertColors,
}: {
	labels: string[],
	data:  Record<LikertLabel, number[]>,
	colors?: Record<LikertLabel, string>,
	xTitle?: string,
	yTitle?: string,
	}, chartOptions: ChartOptions<"bar"> = {}
): string => {
	const datasets = LikertLabels.map( likertLabel => ({
		stack: 'ThereShouldBeOnly1Stack',
		data: data[likertLabel],
		label: likertLabel,
		borderColor: colors[likertLabel],
		backgroundColor: colors[likertLabel],
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
				ticks: {
					precision: 0,
				},
				max: 100,
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
	// console.log("Chart", {options, labels, datasets});
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
