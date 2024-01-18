import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";
import { ScenarioLabel } from "./scenario-labels.ts";

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

export const MatchingScenariosLabelToId = [
  [ScenarioLabel.HackedDevice, 'hacked-device'],
  [ScenarioLabel.LockedDevice, 'locked-device'],
  [ScenarioLabel.HackedAcct, 'hacked-acct'],
  [ScenarioLabel.LockedAcct, 'locked-acct'],
  [ScenarioLabel.HackedSocial, 'hacked-soc'],
  [ScenarioLabel.LockedSocial, 'locked-soc'],
  [ScenarioLabel.HackedFinancial, 'hacked-bank'],
  [ScenarioLabel.LockedFinancial, 'locked-bank'],
  [ScenarioLabel.HackedPwds, 'hacked-pwds'],
  [ScenarioLabel.LockedPwds, 'locked-pwds'],
] as const;