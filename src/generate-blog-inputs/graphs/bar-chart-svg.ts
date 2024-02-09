import { ChartOptions, chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { ChartColors } from "https://deno.land/x/fresh_charts@0.3.1/utils.ts";
import { ChartDataset } from "https://esm.sh/v128/chart.js@4.3.0/auto/auto.js";
import { LikertLabel, LikertColors, LikertLabels } from "../../analyze-survey-responses/generate/graph-data/likert.ts";

export interface BarChartParameters<X_AXIS_CATEGORY extends string = string> {
	datasets: ChartDataset<"bar">[],
	yType?: "percent" | "absolute",
	xAxisCategoryLabels: readonly X_AXIS_CATEGORY[],
	xTitle?: string,
	yTitle?: string,
	chartOptions?: ChartOptions<"bar">
}

export const barChartSvg = <X_AXIS_CATEGORY extends string>({
	yType,
	xAxisCategoryLabels,
	datasets,
	xTitle,
	yTitle = yType === null ? undefined : `${yType === "percent" ? 'Percent' : 'Number'} of Participants`,
	chartOptions = {},
}: BarChartParameters
): string => {
	const previouslySeenSet = new Map<string, number>();
	const yStacks = new Set(datasets.map( d => d.stack)).size;
	const filter = (legendItem: {text: string}): boolean => {
		const s = legendItem.text;
		const prevTimesSeen: number = previouslySeenSet.get(s) ?? 0;
		previouslySeenSet.set(s, prevTimesSeen + 1);
		const isForFirstStack = yStacks <= 1 ? true : prevTimesSeen % yStacks === 0;
		return isForFirstStack;
	}
	const options = {
		devicePixelRatio: 1,
		...chartOptions,
		plugins: {
			legend: {
				labels: {
					filter
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
				...(yType === 'percent' ? {max: 100} : {}),
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
			labels: [...xAxisCategoryLabels],
			datasets,
		},
	});
	return svg
		// Hack to remove textLength values that mess up x axis label
		.replaceAll(RegExp(`textLength="[\\d\\.]+"`, "g"), "");
};


export interface SubBarChartParameters<SUB_BAR_CATEGORY extends string, X_AXIS_CATEGORY extends string> extends Omit<BarChartParameters<X_AXIS_CATEGORY>, "datasets"> {
	subBarCategories: readonly SUB_BAR_CATEGORY[],
	subBarColors?: Record<SUB_BAR_CATEGORY, string> | string[]
	data: Record<SUB_BAR_CATEGORY, readonly number[]>,
}

export const barChartWithSubBarsSvg = <SUB_BAR_CATEGORY extends string, X_AXIS_CATEGORY extends string>({
		yType = 'absolute',
		subBarCategories,
		subBarColors = [ChartColors.Red, ChartColors.Orange, ChartColors.Blue, ChartColors.Green, ChartColors.Purple, ChartColors.Grey],
		data,
		...args
	}: SubBarChartParameters<SUB_BAR_CATEGORY, X_AXIS_CATEGORY>
): string => {
	const datasets = subBarCategories.map( (subBarCategory, index) => ({
		stack: 'ThereShouldBeOnly1Stack',
		data: [...data[subBarCategory]],
		label: subBarCategory,
		borderColor: Array.isArray(subBarColors) ? subBarColors[index % subBarColors.length] : subBarColors[subBarCategory],
		backgroundColor: Array.isArray(subBarColors) ? subBarColors[index % subBarColors.length] : subBarColors[subBarCategory],
	} satisfies ChartDataset<"bar">)) ;
	return barChartSvg({...args, yType, datasets});
};

export interface LikertSubBarChartParameters<X_AXIS_CATEGORY extends string> extends Omit<BarChartParameters<X_AXIS_CATEGORY>, "datasets"> {
	subBarColors?: Record<LikertLabel, string> | string[]
	data: Record<LikertLabel, readonly number[]>,
}

 export const barChartWithLikertSubBarsSvg = <X_AXIS_CATEGORY extends string>({
	subBarColors = LikertColors,
	...args
}: LikertSubBarChartParameters<X_AXIS_CATEGORY>
): string => barChartWithSubBarsSvg({...args, subBarColors, subBarCategories: LikertLabels});;