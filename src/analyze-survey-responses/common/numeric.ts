export const numeric = (x: number | undefined): number => x ?? 0;

export const percentage = (numerator: number | undefined, denominator: number | undefined, round: boolean = false): number | undefined => {
	if (numerator == null || denominator == null) {
		return undefined;
	}
	const percentage = numerator * 100 / denominator;
	return round ? Math.round(percentage) : percentage;
}