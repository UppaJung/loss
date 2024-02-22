export const numeric = (x: number | undefined): number => x ?? 0;

export const percentage = (numerator: number | undefined, denominator: number | undefined, round: boolean = false): number => {
	if (numerator == null || denominator == null || isNaN(numerator) || isNaN(denominator) || denominator === 0) {
		return 0;
	}
	const percentage = numerator * 100 / denominator;
	return round ? Math.round(percentage) : percentage;
}