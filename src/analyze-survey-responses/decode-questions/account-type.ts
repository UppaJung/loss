import { answerSpec } from "../utilities/validateAnswer.ts";
import { ScenarioLabel } from "./scenario-labels.ts";

export enum AccountTypeQuestion {
  Apple = 'Apple',
  Google = 'Google',
  Microsoft = 'Microsoft',
  Other = 'Other',
};

export const [decodeAccountTypeQuestion, AccountTypeQuestionList] = answerSpec([
  ["Apple", AccountTypeQuestion.Apple],
  ["Google", AccountTypeQuestion.Google],
  ["Microsoft", AccountTypeQuestion.Microsoft],
  ["Other", AccountTypeQuestion.Other],
]);

export const AccountTypeLabelToId = [
  [ScenarioLabel.HackedAcct, 'hacked-acct-type'],
  [ScenarioLabel.LockedAcct, 'locked-acct-type'],
] as const;