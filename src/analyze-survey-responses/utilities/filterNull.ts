export const filterNull = <T>(array: T[]) =>
	array.filter((item) => item != null) as NonNullable<T>[];