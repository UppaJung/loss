import { answerSpec } from "../utilities/validateAnswer.ts";
import { ScenarioLabel } from "./scenario-labels.ts";

export enum AnswerToRecencyQuestion {
  Year1 = 'Within Year',
  Year3 = '1-3 Years',
  Year5 = '3-5 Years',
  Year10 = '5-10 Years',
  Year10Plus = '> 10 years',
  other = 'other',
};

export const [decodeRecencyQuestion, AnswerToRecencyQuestionList] = answerSpec([
  ["within the past year ", AnswerToRecencyQuestion.Year1],
  ["past 3 years ", AnswerToRecencyQuestion.Year3],
  ["past 5 years ", AnswerToRecencyQuestion.Year5],
  ["past 10 years", AnswerToRecencyQuestion.Year10],
  ["more than 10", AnswerToRecencyQuestion.Year10Plus],
  ["other", AnswerToRecencyQuestion.other],
]);

export const ScenarioLabelWithRecencyIdTuples = [
  [ScenarioLabel.HackedDevice, 'hacked-device-when'],
  [ScenarioLabel.LockedDevice, 'locked-device-when'],
  [ScenarioLabel.HackedAcct, 'hacked-acct-when'],
  [ScenarioLabel.LockedAcct, 'locked-acct-when'],
  [ScenarioLabel.HackedSocial, 'hacked-soc-when'],
  [ScenarioLabel.LockedSocial, 'locked-soc-when'],
  [ScenarioLabel.HackedFinancial, 'hacked-bank-when'],
  [ScenarioLabel.LockedFinancial, 'locked-bank-when'],
  [ScenarioLabel.HackedPwds, 'hacked-pwds-when'],
  [ScenarioLabel.LockedPwds, 'locked-pwds-when'],
] as const;