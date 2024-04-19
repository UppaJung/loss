import {type ChartOptions, type ChartDataset, type DefaultDataPoint, type ChartType } from "./chart.ts";
import { chart } from "./chart.ts";
import { LikertSeverityColors } from "../../analyze-survey-responses/generate/graph-data/common/likert.ts";
import { LikertLabel } from "../../analyze-survey-responses/generate/graph-data/common/likert.ts";
import { LikertLabels } from "../../analyze-survey-responses/generate/graph-data/common/likert.ts";

// From "https://deno.land/x/fresh_charts@0.3.1/utils.ts";
/** A set of CSS RGB colors which can be used with charts. */
export enum ChartColors {
  Red = "rgb(255, 99, 132)",
  Orange = "rgb(255, 159, 64)",
  Yellow = "rgb(255, 205, 86)",
  Green = "rgb(75, 192, 192)",
  Blue = "rgb(54, 162, 235)",
  Purple = "rgb(153, 102, 255)",
  Grey = "rgb(201, 203, 207)",
}

export interface ChartAxisTitles {
  xTitle?: string;
  yTitle?: string;
}


export interface ChartSvgParameters<CHART_TYPE extends "line" | "bar",
	TData = DefaultDataPoint<CHART_TYPE>,
	X_AXIS_CATEGORY extends string = string>  extends ChartAxisTitles {
	datasets: ChartDataset<CHART_TYPE, TData>[],
	xType?: "category" | "linear",
	yType?: "percent" | "absolute",
	cdf?: "accumulateLeft" | "accumulateRight",
	maxY?: number,
	hideLegend?: boolean,
	xAxisCategoryLabels?: readonly X_AXIS_CATEGORY[],
	xStacked?: true,
	yStacked?: true,
	chartOptions?: ChartOptions<CHART_TYPE>
}

export const chartSvg = <CHART_TYPE extends "line" | "bar">(chartType: CHART_TYPE) => 
	<TData = DefaultDataPoint<CHART_TYPE>, X_AXIS_CATEGORY extends string = string>({
		yType = 'absolute',
		xAxisCategoryLabels,
		cdf,
		datasets,
		maxY,
		xTitle,
	  hideLegend=false,
		yTitle = yType === null ? undefined : `${yType === "percent" ? 'Percent' : 'Number'} of Participants`,
		xStacked, yStacked,
		chartOptions = {} as ChartOptions<CHART_TYPE>,
	}: ChartSvgParameters<CHART_TYPE, TData, X_AXIS_CATEGORY>
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
			...("plugins" in chartOptions ? chartOptions.plugins as ChartOptions<CHART_TYPE> : {}),
			legend: {
				display: !hideLegend,
				labels: {
					filter
				}
			}
		},
		scales: {
			x: {
				...(xStacked ? {stacked: true} : {}),
				type: xAxisCategoryLabels == null ? "linear" : "category",
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
				...(maxY != null ? {max: maxY} : {}),
//				...(yType === 'percent' ? {max: 100} : {}),
				...(yStacked ? {stacked: true} : {}),
				...(((chartOptions as ChartOptions<"bar">).scales?.y) as  NonNullable<ChartOptions<"bar">["scales"]>["y"]),
				title: {
					display: yTitle != null,
					font: {
						weight: "bold",
					},
					text: yTitle,
					...(chartOptions as ChartOptions<"bar">).scales?.y?.title,
				},
			} as NonNullable<ChartOptions<"bar">["scales"]>["y"],
		},
	} satisfies ChartOptions<CHART_TYPE> as ChartOptions<CHART_TYPE>;
	// console.log("Chart", {options, datasets});
	if (cdf != null) {
		// console.log(`Datasets before`, datasets);
		datasets = (datasets as ChartDataset<"bar" | "line", TData>[]).map( ({data, ...rest}) => {
			if (cdf === "accumulateLeft") {
				data = Array.isArray(data) ? data.toReversed() as TData : data;
			}
			let total = 0;
			if (Array.isArray(data)) {
				data = data.map( (datum) => {
					if (typeof datum === "number") {
						total += datum;
						return total;
					} else if (Array.isArray(datum)) {
						total += datum[1];
						return [datum[0], total];
					} else if (typeof datum === "object" && datum !== null) {
						total += datum.y;
						return {...datum, y: total};
					} else {
						return datum;
					}
				}) as TData;
			}
			if (cdf === "accumulateLeft") {
				data = Array.isArray(data) ? data.toReversed() as TData : data;
			}
			const replacementDataset = {data, ...rest} as unknown as ChartDataset<CHART_TYPE, TData>;
			// console.log(`Replacement dataset`, replacementDataset);
			return replacementDataset;
		});
	}
	const svg = chart({
		type: chartType, height: 600, width: 1200, options: options,
		data: {
			...(xAxisCategoryLabels == null ? {} : {labels: [...xAxisCategoryLabels]}),
			datasets: datasets as ChartDataset<ChartType, TData>[]
		},
	});

	return svg
		// Hack to remove textLength values that mess up x axis label
		.replaceAll(RegExp(`textLength="[\\d\\.]+"`, "g"), "");
};


export const barChartSvg = chartSvg("bar");
export const lineChartSvg = chartSvg("line");

export interface SubBarChartParameters<CHART_TYPE extends ChartType & ("line" | "bar"), SUB_BAR_CATEGORY extends string, X_AXIS_CATEGORY extends string> extends Omit<ChartSvgParameters<CHART_TYPE, X_AXIS_CATEGORY>, "datasets"> {
	subBarCategories: readonly SUB_BAR_CATEGORY[],
	subBarColors?: Record<SUB_BAR_CATEGORY, string> | string[]
	data: Record<SUB_BAR_CATEGORY, readonly number[]>,
}

export const chartWithSubCategoriesSvg = <CHART_TYPE extends ChartType & ("line" | "bar")>(chartType: CHART_TYPE) =>
		<SUB_BAR_CATEGORY extends string, X_AXIS_CATEGORY extends string>({
		subBarCategories,
		subBarColors = [ChartColors.Red, ChartColors.Orange, ChartColors.Blue, ChartColors.Green, ChartColors.Purple, ChartColors.Grey],
		data,
		...rest
	}: SubBarChartParameters<CHART_TYPE, SUB_BAR_CATEGORY, X_AXIS_CATEGORY>
): string => {
		const datasets = subBarCategories.map( (subBarCategory, index) => ({
			stack: 'ThereShouldBeOnly1XStack',
			data: [...data[subBarCategory]],
			label: subBarCategory,
			borderColor: Array.isArray(subBarColors) ? subBarColors[index % subBarColors.length] : subBarColors[subBarCategory],
			backgroundColor: Array.isArray(subBarColors) ? subBarColors[index % subBarColors.length] : subBarColors[subBarCategory],
		} satisfies ChartDataset<"line" | "bar"> as unknown as ChartDataset<CHART_TYPE>));
		return chartSvg(chartType)({yStacked: true, datasets, ...rest});
	};


export const barChartWithSubBarsSvg = chartWithSubCategoriesSvg("bar");
export const lineChartWithSubCategoriesSvg = chartWithSubCategoriesSvg("line");
//  <SUB_BAR_CATEGORY extends string, X_AXIS_CATEGORY extends string>({
// 		subBarCategories,
// 		subBarColors = [ChartColors.Red, ChartColors.Orange, ChartColors.Blue, ChartColors.Green, ChartColors.Purple, ChartColors.Grey],
// 		data,
// 		...rest
// 	}: SubBarChartParameters<"bar", SUB_BAR_CATEGORY, X_AXIS_CATEGORY>
// ): string => {
// 	const datasets = subBarCategories.map( (subBarCategory, index) => ({
// 		stack: 'ThereShouldBeOnly1XStack',
// 		data: [...data[subBarCategory]],
// 		label: subBarCategory,
// 		borderColor: Array.isArray(subBarColors) ? subBarColors[index % subBarColors.length] : subBarColors[subBarCategory],
// 		backgroundColor: Array.isArray(subBarColors) ? subBarColors[index % subBarColors.length] : subBarColors[subBarCategory],
// 	} satisfies ChartDataset<ChartType>)) ;
// 	return barChartSvg({yStacked: true, datasets, ...rest});
// };

export interface GroupBarChartParameters<LEGEND_CATEGORY extends string, AXIS_CATEGORY extends string> extends Omit<ChartSvgParameters<"bar", AXIS_CATEGORY>, "datasets"> {
	legendCategories: readonly LEGEND_CATEGORY[],
	legendColors?: Record<LEGEND_CATEGORY, string> | string[]
	data: Record<LEGEND_CATEGORY, readonly number[]>,
}
export const barChartWithGroupsSvg = <LEGEND_CATEGORY extends string, X_AXIS_CATEGORY extends string>({
	legendCategories,
	legendColors = [ChartColors.Red, ChartColors.Orange, ChartColors.Blue, ChartColors.Green, ChartColors.Purple, ChartColors.Grey],
	data,
	...rest
}: GroupBarChartParameters<LEGEND_CATEGORY, X_AXIS_CATEGORY>
): string => {
	const datasets = legendCategories.map( (legendCategory, index) => ({
		stack: `X Stack for ${legendCategory}`,
		data: [...data[legendCategory]],
		label: legendCategory,
		borderColor: Array.isArray(legendColors) ? legendColors[index % legendColors.length] : legendColors[legendCategory],
		backgroundColor: Array.isArray(legendColors) ? legendColors[index % legendColors.length] : legendColors[legendCategory],
	} satisfies ChartDataset<"bar">)) ;
	return barChartSvg({xStacked: true, datasets, ...rest});
};

export interface LikertSubBarChartParameters<CHART_TYPE extends "bar" | "line", X_AXIS_CATEGORY extends string>
	extends Omit<ChartSvgParameters<CHART_TYPE, X_AXIS_CATEGORY>, "datasets"> {
	subBarColors?: Record<LikertLabel, string> | string[]
	data: Record<LikertLabel, readonly number[]>,
}

 export const barChartWithSeverityLikertSubBarsSvg = <X_AXIS_CATEGORY extends string>({
		subBarColors = LikertSeverityColors,
		...args
	}: LikertSubBarChartParameters<"bar", X_AXIS_CATEGORY>
): string => barChartWithSubBarsSvg({...args, subBarColors, subBarCategories: LikertLabels.toReversed()});;

export const lineChartWithSeverityLikertSubCategoriesSvg = <X_AXIS_CATEGORY extends string>({
	subBarColors = LikertSeverityColors,
	...args
}: LikertSubBarChartParameters<"line", X_AXIS_CATEGORY>
): string => lineChartWithSubCategoriesSvg({...args, subBarColors, subBarCategories: LikertLabels.toReversed()});;