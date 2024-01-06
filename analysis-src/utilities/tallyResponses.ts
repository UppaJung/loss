export const TotalAnswered = '_totalAnswered';
export type TotalAnswered = typeof TotalAnswered;

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
