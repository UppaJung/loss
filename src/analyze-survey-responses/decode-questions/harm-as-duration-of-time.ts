import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";

export enum HarmAsDurationOfTimeLabel {
  None = 'None',
  MoreThanFiveYears = '> 5 Years',
  OneToFiveYears = '1-5 Years',
  Months = 'Months',
  Weeks = 'Weeks',
  Days = 'Days',
  LessThanDay = '< 1 Day',
};

export const [decodeHarmAsDurationOfTime, HarmAsDurationOfTimeLabelListGreatestToLeast] = getAnswerDecoderAndLabels([
  ["More than five years of", HarmAsDurationOfTimeLabel.MoreThanFiveYears],
  ["More than one year of", HarmAsDurationOfTimeLabel.OneToFiveYears],
  ["More than one month of", HarmAsDurationOfTimeLabel.Months],
  ["More than one week of", HarmAsDurationOfTimeLabel.Weeks],
  ["More than one day of", HarmAsDurationOfTimeLabel.Days],
  ["Less than one day of", HarmAsDurationOfTimeLabel.LessThanDay],
  ["never", HarmAsDurationOfTimeLabel.None],
]);

export const HarmAsDurationOfTimeLabelListLeastToGreatest = HarmAsDurationOfTimeLabelListGreatestToLeast.toReversed();