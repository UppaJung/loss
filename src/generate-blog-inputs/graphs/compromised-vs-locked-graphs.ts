import { ChartOptions, chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { ChartColors } from "https://deno.land/x/fresh_charts@0.3.1/utils.ts";

export const graphCompromisedVsLockedOut = ({labels, data, xTitle, yTitle = "Number of Participants"}: {
	labels: string[],
	data: {
			compromised: number[],
			lockedOut: number[]
		}
	xTitle?: string,
	yTitle?: string,
	}, chartOptions: ChartOptions<"bar"> = {}) => {
	const datasets =	[{
		data: data.compromised,
		label: "Compromised",
		borderColor: ChartColors.Red,
		backgroundColor: ChartColors.Red,
	},
	{
		data: data.lockedOut,
		label: "Locked out",
		borderColor: ChartColors.Blue,
		backgroundColor: ChartColors.Blue,
	}];
	const options = {
		devicePixelRatio: 1,
		...chartOptions,
		scales: {
			...chartOptions.scales,
			x: {
				...chartOptions.scales?.x,
				title: {
					display: xTitle != null,
					align: "center",
					font: {
						weight: "bold",
					},
					text: xTitle,
					...chartOptions.scales?.x?.title,
				}
			} as NonNullable<ChartOptions<"bar">["scales"]>["x"],
			y: {
				type: "linear",
				beginAtZero: true, 
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
