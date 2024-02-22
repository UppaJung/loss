import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";
import { SurveyKey } from "../survey-keys/index.ts";
import { EventScenarioLabel } from "./event-scenario-labels.ts";

export enum AnswerToRecencyQuestionLabels {
  Year1 = 'Within Year',
  Year3 = '1-3 Years',
  Year5 = '3-5 Years',
  Year10 = '5-10 Years',
  Year10Plus = '> 10 years',
  Other = 'Other',
};

export const [decodeRecencyQuestion, AnswerToRecencyQuestionList] = getAnswerDecoderAndLabels([
  ["within the past year ", AnswerToRecencyQuestionLabels.Year1],
  ["past 3 years ", AnswerToRecencyQuestionLabels.Year3],
  ["past 5 years ", AnswerToRecencyQuestionLabels.Year5],
  ["past 10 years", AnswerToRecencyQuestionLabels.Year10],
  ["more than 10", AnswerToRecencyQuestionLabels.Year10Plus],
  ["other", AnswerToRecencyQuestionLabels.Other],
]);

export const ScenarioLabelWithRecencyIdTuples = [
  [EventScenarioLabel.HackedDevice, 'hacked-device-when'],
  [EventScenarioLabel.LockedDevice, 'locked-device-when'],
  [EventScenarioLabel.HackedAcct, 'hacked-acct-when'],
  [EventScenarioLabel.LockedAcct, 'locked-acct-when'],
  [EventScenarioLabel.HackedSocial, 'hacked-soc-when'],
  [EventScenarioLabel.LockedSocial, 'locked-soc-when'],
  [EventScenarioLabel.HackedFinancial, 'hacked-bank-when'],
  [EventScenarioLabel.LockedFinancial, 'locked-bank-when'],
  [EventScenarioLabel.HackedPwds, 'hacked-pwds-when'],
  [EventScenarioLabel.LockedPwds, 'locked-pwds-when'],
  [EventScenarioLabel.ReplacedOrUpgraded, 'swap-device-when'],
  [EventScenarioLabel.BrokenPromise, 'disconnect-when'],
] as const satisfies [EventScenarioLabel, SurveyKey][];