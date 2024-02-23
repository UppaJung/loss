import { ChartOptions, chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { ChartDataset } from "https://esm.sh/v128/chart.js@4.3.0/auto/auto.js";
import { ChartAxisTitles } from "./chart-svg.ts";

export interface ScatterPlotParameters<X_AXIS_CATEGORY extends string = string>  extends ChartAxisTitles{
	data: readonly {x: number, y: number}[],
	options?: ChartOptions<"scatter">
}

export const scatterPlotSvg = <X_AXIS_CATEGORY extends string>({
	xTitle, yTitle,
	data,
	options = {},
}: ScatterPlotParameters
): string => {
	const dataset: ChartDataset<"scatter"> = {
		label: "Age vs. Scenarios Matched",
		data: [...data],
	}
	const chartOptions = {
		devicePixelRatio: 1,
		...options,
		scales: {
			x: {
				type: "linear",
				position: 'bottom',
				...options.scales?.x,
				title: {
					display: xTitle != null,
					font: {weight: "bold",},
					text: xTitle,
				},
			} as NonNullable<ChartOptions<"scatter">["scales"]>["x"],
			y: {
				type: "linear",
				beginAtZero: true,
				ticks: {
					precision: 0,
				},
				...options.scales?.y,
				title: {
					display: yTitle != null,
					font: {
						weight: "bold",
					},
					text: yTitle,
					...options.scales?.y?.title,
				},
			} as NonNullable<ChartOptions<"scatter">["scales"]>["y"],
		},
	} satisfies ChartOptions<"scatter">;
	// console.log("Chart", {options, labels, datasets});
	const svg = chart<"scatter">({
		type: "scatter", height: 600, width: 1200, options: chartOptions,
		data: {
			datasets: [dataset]
		},
	});
	return svg
		// Hack to remove textLength values that mess up x axis label
		.replaceAll(RegExp(`textLength="[\\d\\.]+"`, "g"), "");
};
