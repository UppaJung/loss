import { chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { ChartColors, transparentize } from "https://deno.land/x/fresh_charts@0.3.1/utils.ts";
import { tallyResponses } from "../utilities/tallyResponses.ts";
import { filterNull } from "../utilities/filterNull.ts";
import { decodePhoneTypeQuestion, decodeTabletTypeQuestion, decodeComputerTypeQuestion, PhoneTypeList, TabletTypeList, ComputerTypeList } from "../decode-questions/device.ts";
import { AugmentedSurveyResponses } from "../SurveyResponse.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphDeviceBarChart = (outPath: string, responses: AugmentedSurveyResponses) => {

	const [hackedTallies, lockedTallies] = (["hacked", "locked"] as const).map( scenario => tallyResponses(filterNull(responses.map( response => 
		decodePhoneTypeQuestion(response[`${scenario}-phone-type`]) ??
		decodeTabletTypeQuestion(response[`${scenario}-tablet-type`]) ??
		decodeComputerTypeQuestion(response[`${scenario}-pc-type`]) ))));
	const labels = [...PhoneTypeList, ...TabletTypeList, ...ComputerTypeList];
	const datasets =	[{
		data: labels.map( label => hackedTallies[label] ?? 0 ),
		label: "hacked",
		borderColor: ChartColors.Red,
		backgroundColor: ChartColors.Red,
	},
	{
		data: labels.map( label => lockedTallies[label] ?? 0 ),
		label: "locked",
		borderColor: ChartColors.Blue,
		backgroundColor: ChartColors.Blue,
	}];
	// console.log(`datasets`, datasets);
	Deno.writeTextFileSync(`${outPath}/device-bar-chart.svg`, chart({
		type: "bar", height: 400, width: 800,
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
