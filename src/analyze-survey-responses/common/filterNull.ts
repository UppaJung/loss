/**
 * This helper function removes null elements from an array AND (importantly),
 * does so in a way so that TypeScript knows the result will have no null/undefined values.
 * @param array An array of possibly null/undefined values
 * @returns A copy of the input array, with order preserved, but with any null/undefined values removed.
 */
export const filterNull = <T>(array: T[]) =>
	array.filter((item) => item != null) as NonNullable<T>[];