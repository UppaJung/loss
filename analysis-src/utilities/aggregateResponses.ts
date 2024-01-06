export const aggregateResponses = <RESPONSE extends string>(
  responses: Record<RESPONSE | '_totalAnswered', number>,
  ...toTally: RESPONSE[]
) => toTally.reduce( (tally, responseToInclude) => {
    return tally + (responses[responseToInclude] ?? 0);
  }, 0);
