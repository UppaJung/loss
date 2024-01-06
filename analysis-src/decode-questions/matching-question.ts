import { answerSpec } from "../utilities/validateAnswer.ts";

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
  ['Hacked Device', 'hacked-device'],
  ['Locked Device', 'locked-device'],
  ['Hacked Acct', 'hacked-acct'],
  ['Locked Acct', 'locked-acct'],
  ['Hacked Social', 'hacked-soc'],
  ['Locked Social', 'locked-soc'],
  ['Hacked Financial', 'hacked-bank'],
  ['Locked Financial', 'locked-bank'],
  ['Hacked Pwds', 'hacked-pwds'],
  ['Locked Pwds', 'locked-pwds'],
] as const;