import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";
import type { SurveyKey } from "../survey-keys/index.ts";
import { EventScenarioLabel } from "./event-scenario-labels.ts";

export enum AnswerToMatchingQuestion {
  MatchedTopThree = 'Original',
  AddToTopThree = 'Added',
  BelowTopThree = 'Not Worst',
  CouldHappen = 'Could Happen',
  Impossible = 'Impossible',
};

export const AnswerToMatchQuestionColors = {
  [AnswerToMatchingQuestion.MatchedTopThree]: "rgb(196,0,0)",
  [AnswerToMatchingQuestion.AddToTopThree]: "rgb(224,148,0)",
  [AnswerToMatchingQuestion.BelowTopThree]:  "rgb(180 ,180 ,224)",
  [AnswerToMatchingQuestion.CouldHappen]:  "rgb(224, 224 ,224)",
  [AnswerToMatchingQuestion.Impossible]: "rgb(248, 248, 248)",
} satisfies  Record<AnswerToMatchingQuestion, string>;

export const AnswersIndicatingParticipantExperiencedScenario = [
  AnswerToMatchingQuestion.MatchedTopThree,
  AnswerToMatchingQuestion.AddToTopThree,
  AnswerToMatchingQuestion.BelowTopThree,
] as const;
export type AnswerIndicatingParticipantExperiencedScenario = typeof AnswersIndicatingParticipantExperiencedScenario[number];

export const [decodeMatchingQuestion, AnswerToMatchingQuestionList] = getAnswerDecoderAndLabels([
  ["I included", AnswerToMatchingQuestion.MatchedTopThree],
  ["should have included", AnswerToMatchingQuestion.AddToTopThree],
  ["not among", AnswerToMatchingQuestion.BelowTopThree],
  ["but I worry it could happen", AnswerToMatchingQuestion.CouldHappen],
  ["could not happen", AnswerToMatchingQuestion.Impossible],
]);

export enum PairedScenario {
  Device = 'Device',
  Account = 'Account',
  Social = 'Social',
  Bank = 'Bank',
  Passwords = 'Passwords'
};

export const PairedScenarios = [
  PairedScenario.Device,
  PairedScenario.Account,
  PairedScenario.Social,
  PairedScenario.Bank,
  PairedScenario.Passwords,
] as const;

export const UnpairedScenarioLabels = [
  EventScenarioLabel.ReplacedOrUpgraded,
  EventScenarioLabel.BrokenPromise,
] as const;
export type UnpairedScenarioLabel = typeof UnpairedScenarioLabels[number];

export const UnpairedScenariosLabelToId = [
  [EventScenarioLabel.ReplacedOrUpgraded, 'swap-device'],
  [EventScenarioLabel.BrokenPromise, 'disconnect'],
] as const satisfies readonly [UnpairedScenarioLabel, SurveyKey][];

export const scenarioMatchingQuestionId = (failureMode: 'hacked' | 'locked', scenario: PairedScenario) => {
  switch (scenario) {
    case PairedScenario.Device: return `${failureMode}-device` as const satisfies SurveyKey;
    case PairedScenario.Account: return `${failureMode}-acct` as const satisfies SurveyKey;
    case PairedScenario.Social: return `${failureMode}-soc` as const satisfies SurveyKey;
    case PairedScenario.Bank: return `${failureMode}-bank` as const satisfies SurveyKey;
    case PairedScenario.Passwords: return `${failureMode}-pwds` as const satisfies SurveyKey;
  }
}

export const MatchingScenariosLabelToId = [
  [EventScenarioLabel.HackedDevice, 'hacked-device'],
  [EventScenarioLabel.LockedDevice, 'locked-device'],
  [EventScenarioLabel.HackedAcct, 'hacked-acct'],
  [EventScenarioLabel.LockedAcct, 'locked-acct'],
  [EventScenarioLabel.HackedSocial, 'hacked-soc'],
  [EventScenarioLabel.LockedSocial, 'locked-soc'],
  [EventScenarioLabel.HackedFinancial, 'hacked-bank'],
  [EventScenarioLabel.LockedFinancial, 'locked-bank'],
  [EventScenarioLabel.HackedPwds, 'hacked-pwds'],
  [EventScenarioLabel.LockedPwds, 'locked-pwds'],
  [EventScenarioLabel.ReplacedOrUpgraded, 'swap-device'],
  [EventScenarioLabel.BrokenPromise, 'disconnect'],
] as const satisfies readonly [EventScenarioLabel, SurveyKey][];

