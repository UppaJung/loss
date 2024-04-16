export const TotalAnswered = '_totalAnswered';
export type TotalAnswered = typeof TotalAnswered;
export const TotalResponses = '_totalResponses';
export type TotalResponses = typeof TotalResponses;

/**
 * Given an array of values, create a map of each value to the number of times it appears in the array.
 * Then add a special field (keyed by the constant `TotalAnswered`) with the total count.
 * @param responses 
 * @returns An array of answers to the number of times they appear in the array.
 */
export const tallyResponses = <RESPONSE extends string>(
  responses: (RESPONSE | RESPONSE[] | undefined)[]
): Record<RESPONSE | TotalAnswered, number> =>
  responses.reduce((res, response) => {
    if (response != null && response != "") {
      if (Array.isArray(response)) {
        response.forEach(r => {
          res[r] = (res[r] ?? 0) + 1;
        });
      } else {
        res[response] = (res[response] ?? 0) + 1;
      }
      res[TotalAnswered] = (res[TotalAnswered] ?? 0) + 1;
    }
    return res;
  }, {[TotalResponses]: responses.length} as Record<RESPONSE | TotalAnswered, number>);
