export const TotalAnswered = '_totalAnswered';
export type TotalAnswered = typeof TotalAnswered;

/**
 * Given an array of values, create a map of each value to the number of times it appears in the array.
 * Then add a special field (keyed by the constant `TotalAnswered`) with the total count.
 * @param responses 
 * @returns An array of answers to the number of times they appear in the array.
 */
export const tallyResponses = <RESPONSE extends string>(
  responses: RESPONSE[]
): Record<RESPONSE | TotalAnswered, number> =>
  responses.reduce((res, response) => {
    res[response] = (res[response] ?? 0) + 1;
    if (response != null && response != "") {
      res[TotalAnswered] = (res[TotalAnswered] ?? 0) + 1;
    }
    return res;
  }, {} as Record<RESPONSE | TotalAnswered, number>);
