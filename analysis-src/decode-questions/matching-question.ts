import { answerSpec } from "../utilities/validateAnswer.ts";
import { ScenarioLabel } from "./scenario-labels.ts";

export enum AnswerToMatchingQuestion {
  MatchedTopThree = 'Original',
  AddToTopThree = 'Added',
  BelowTopThree = 'Not Worst',
  CouldHappen = 'Could Happen',
  Impossible = 'Impossible',
};

export const [decodeMatchingQuestion, AnswerToMatchingQuestionList] = answerSpec([
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