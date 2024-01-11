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

export enum SocialAccountTypeQuestion {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Twitter = 'Twitter/X',
  SnapChat = 'SnapChat',
  WhatsApp = 'WhatsApp',
  WeChat = 'WeChat',
  Signal = 'Signal',
  Other = 'Other',
};

export const [decodeSocialAccountTypeQuestion, SocialAccountTypeQuestionList] = answerSpec([
  ["Facebook", SocialAccountTypeQuestion.Facebook],
  ["Instagram", SocialAccountTypeQuestion.Instagram],
  ["Twitter", SocialAccountTypeQuestion.Twitter],
  ["SnapChat", SocialAccountTypeQuestion.SnapChat],
  ["WhatsApp", SocialAccountTypeQuestion.WhatsApp],
  ["WeChat", SocialAccountTypeQuestion.WeChat],
  ["Signal", SocialAccountTypeQuestion.Signal],
  ["Other", SocialAccountTypeQuestion.Other],
]);

export const SocialAccountTypeLabelToId = [
  [ScenarioLabel.HackedAcct, 'hacked-soc-type'],
  [ScenarioLabel.LockedAcct, 'locked-soc-type'],
] as const;