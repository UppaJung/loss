import { generateGraphs } from "./generate-graphs/index.ts";

export const generateBlogInputs = () => {
	generateGraphs();	
}

if (import.meta.main) {
 generateBlogInputs();
}