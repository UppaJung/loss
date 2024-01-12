/**
 * Add up the tallies for multiple responses into a sum total.
 * @param responses The map of responses labels to tallies
 * @param toTally The remaining parameters of labels to be tallied
 * @returns The sum of the labels (undefined counts are 0)
 */
export const aggregateResponses = <RESPONSE extends string>(
  responses: Record<RESPONSE | '_totalAnswered', number>,
  ...toTally: RESPONSE[]
) => toTally.reduce( (tally, responseToInclude) => {
    return tally + (responses[responseToInclude] ?? 0);
  }, 0);
