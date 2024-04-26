import { getMultipleAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";
import type { SurveyKey } from "../survey-keys/index.ts";
import { EventScenarioLabel } from "./scenario-labels.ts";

// Yes, this happened as part of experience 1 above
// Yes, this happened as part of experience 2 above
// Yes, this happened as part of experience 3 above
// Yes, and while I did not describe it above, I should have ranked it my most harmful
// Yes, and while I did not describe it above, I should have ranked it my second-most harmful
// Yes, and while I did not describe it above, I should have ranked it my third-most harmful
// Yes, but I did not describe it above because it should not rank among my three most harmful
// No, but I do worry that this might happen to me in the future
// No, and I do not worry that this might happen to me in the future

export enum ExperienceMatchingAnswer {
  OriginallyMostHarmful = 'Originally Most Harmful',
  OriginallySecondMostHarmful = 'Originally 2nd Most Harmful',
  OriginallyThirdMostHarmful = 'Originally 3rd Most Harmful',
  RetrospectivelyMostHarmful = 'Retrospectively Most Harmful',
  RetrospectivelySecondMostHarmful = 'Retrospectively 2nd Most Harmful',
  RetrospectivelyThirdMostHarmful = 'Retrospectively 3rd Most Harmful',
  NotAmongMostHarmful = 'Not Among Most Harmful',
  CouldHappen = 'Could Happen',
  Impossible = 'Impossible',
};

export const [decodeExperienceMatchingQuestion, ExperienceMatchingAnswers] = getMultipleAnswerDecoderAndLabels([
  ["experience 1", ExperienceMatchingAnswer.OriginallyMostHarmful],
  ["experience 2", ExperienceMatchingAnswer.OriginallySecondMostHarmful],
  ["experience 3", ExperienceMatchingAnswer.OriginallyThirdMostHarmful],
  ["should have ranked it my most harmful", ExperienceMatchingAnswer.RetrospectivelyMostHarmful],
  ["should have ranked it my second-most harmful", ExperienceMatchingAnswer.RetrospectivelySecondMostHarmful],
  ["should have ranked it my third-most harmful", ExperienceMatchingAnswer.RetrospectivelyThirdMostHarmful],
  ["should not rank among my three most harmful", ExperienceMatchingAnswer.NotAmongMostHarmful],
  ["I do worry", ExperienceMatchingAnswer.CouldHappen],
  ["I do not worry", ExperienceMatchingAnswer.Impossible],
]);


export enum AnswerToMatchingQuestion {
  MatchedThreeWorst = 'Original',
  RevisedToAddToThreeWorst = 'Revised',
  BelowTopThree = 'Not Worst',
  CouldHappen = 'Could Happen',
  Impossible = 'Impossible',
};

export const AnswerToMatchingQuestionList = [
  AnswerToMatchingQuestion.MatchedThreeWorst,
  AnswerToMatchingQuestion.RevisedToAddToThreeWorst,
  AnswerToMatchingQuestion.BelowTopThree,
  AnswerToMatchingQuestion.CouldHappen,
  AnswerToMatchingQuestion.Impossible,
] as const;

export const AnswerToMatchQuestionColors = {
  [AnswerToMatchingQuestion.MatchedThreeWorst]: "rgb(196,0,0)",
  [AnswerToMatchingQuestion.RevisedToAddToThreeWorst]: "rgb(224,148,0)",
  [AnswerToMatchingQuestion.BelowTopThree]:  "rgb(180 ,180 ,224)",
  [AnswerToMatchingQuestion.CouldHappen]:  "rgb(224, 224 ,224)",
  [AnswerToMatchingQuestion.Impossible]: "rgb(248, 248, 248)",
} satisfies  Record<AnswerToMatchingQuestion, string>;

export const AnswersIndicatingParticipantExperiencedScenario = [
  AnswerToMatchingQuestion.MatchedThreeWorst,
  AnswerToMatchingQuestion.RevisedToAddToThreeWorst,
  AnswerToMatchingQuestion.BelowTopThree,
] as const;
export type AnswerIndicatingParticipantExperiencedScenario = typeof AnswersIndicatingParticipantExperiencedScenario[number];

export const decodeMatchingQuestion = (answer: string): AnswerToMatchingQuestion | undefined => {
  const answers = decodeExperienceMatchingQuestion(answer);
  if (
    answers.includes(ExperienceMatchingAnswer.OriginallyMostHarmful) ||
    answers.includes(ExperienceMatchingAnswer.OriginallySecondMostHarmful) ||
    answers.includes(ExperienceMatchingAnswer.OriginallyThirdMostHarmful)
  ) {
    return AnswerToMatchingQuestion.MatchedThreeWorst;
  } else if (
    answers.includes(ExperienceMatchingAnswer.RetrospectivelyMostHarmful) ||
    answers.includes(ExperienceMatchingAnswer.RetrospectivelySecondMostHarmful) ||
    answers.includes(ExperienceMatchingAnswer.RetrospectivelyThirdMostHarmful)
  ) {
    return AnswerToMatchingQuestion.RevisedToAddToThreeWorst;
  } else if (answers.includes(ExperienceMatchingAnswer.NotAmongMostHarmful)) {
    return AnswerToMatchingQuestion.BelowTopThree;
  } else if (answers.includes(ExperienceMatchingAnswer.CouldHappen)) {
    return AnswerToMatchingQuestion.CouldHappen;
  } else if (answers.includes(ExperienceMatchingAnswer.Impossible)) {
    return AnswerToMatchingQuestion.Impossible;
  }
  return;
}
// export const [decodeMatchingQuestion] = getMultipleAnswerDecoderAndLabels([
//   ["experience", AnswerToMatchingQuestion.MatchedThreeWorst],
//   ["should have ranked it my", AnswerToMatchingQuestion.RevisedToAddToThreeWorst],
//   ["should not rank among my three most harmful", AnswerToMatchingQuestion.BelowTopThree],
//   ["I do worry", AnswerToMatchingQuestion.CouldHappen],
//   ["I do not worry", AnswerToMatchingQuestion.Impossible],
// ]);

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
  EventScenarioLabel.Abuse,
] as const;
export type UnpairedScenarioLabel = typeof UnpairedScenarioLabels[number];

export const UnpairedScenariosLabelToId = [
  [EventScenarioLabel.ReplacedOrUpgraded, 'swap-device?'],
  [EventScenarioLabel.BrokenPromise, 'disconnect?'],
  [EventScenarioLabel.Abuse, 'abuse?'],
] as const satisfies readonly [UnpairedScenarioLabel, SurveyKey][];

export const scenarioMatchingQuestionId = (failureMode: 'hacked' | 'locked', scenario: PairedScenario) => {
  switch (scenario) {
    case PairedScenario.Device: return `${failureMode}-device?` as const satisfies SurveyKey;
    case PairedScenario.Account: return `${failureMode}-acct?` as const satisfies SurveyKey;
    case PairedScenario.Social: return `${failureMode}-soc?` as const satisfies SurveyKey;
    case PairedScenario.Bank: return `${failureMode}-bank?` as const satisfies SurveyKey;
    case PairedScenario.Passwords: return `${failureMode}-pwds?` as const satisfies SurveyKey;
  }
}
