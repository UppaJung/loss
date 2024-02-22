import { generateGraphsPilot6 } from "./generate-graphs-for-pilot6.ts";
import { generateGraphsPilot7 } from "./generate-graphs-for-pilot7.ts";
import { generateGraphsPilot8 } from "./generate-graphs-for-pilot8.ts";

export const generateGraphs = () => {
	generateGraphsPilot6();
	generateGraphsPilot7();
	generateGraphsPilot8();
}