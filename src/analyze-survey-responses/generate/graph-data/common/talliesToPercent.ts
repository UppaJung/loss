import { TotalAnswered } from "../../../common/tallyResponses.ts";
import { percentage } from "../../../common/numeric.ts";


export const tallyToPercent = <T extends string | TotalAnswered>(
  tally: Record<T | TotalAnswered, number>
): Record<Exclude<T, TotalAnswered>, number> => Object.fromEntries((Object.keys(tally).filter(x => x !== TotalAnswered) as T[]).map((answer) => (
  [answer, percentage(tally[answer], tally[TotalAnswered] ?? 0) ?? 0] as [T, number]
))) as Record<Exclude<T, TotalAnswered>, number>;
