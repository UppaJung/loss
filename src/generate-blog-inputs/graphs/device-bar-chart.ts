import { chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { ChartColors } from "https://deno.land/x/fresh_charts@0.3.1/utils.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphDeviceBarChart = (outputPath: string, labels: string[], data: {hacked: readonly number[], locked: readonly number[]}) => {

	const datasets =	[{
		data: data.hacked,
		label: "hacked",
		borderColor: ChartColors.Red,
		backgroundColor: ChartColors.Red,
	},
	{
		data: data.locked,
		label: "locked",
		borderColor: ChartColors.Blue,
		backgroundColor: ChartColors.Blue,
	}];
	// console.log(`datasets`, datasets);
	Deno.writeTextFileSync(`${outputPath}/device-bar-chart.svg`, chart({
		type: "bar", height: 600, width: 1200,
		data: {
			labels,
			datasets,
		},
		options: {
			devicePixelRatio: 1,
			scales: {
				x: {},
				y: { beginAtZero: true }
			},
		},
	}));
};
