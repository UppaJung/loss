import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";
import { EventScenarioLabel } from "./scenario-labels.ts";

export enum AccountTypeQuestion {
  Apple = 'Apple',
  Google = 'Google',
  Microsoft = 'Microsoft',
  Other = 'Other',
};

export const [decodeAccountTypeQuestion, AccountTypeQuestionList] = getAnswerDecoderAndLabels([
  ["Apple", AccountTypeQuestion.Apple],
  ["Google", AccountTypeQuestion.Google],
  ["Microsoft", AccountTypeQuestion.Microsoft],
  ["Other", AccountTypeQuestion.Other],
]);

export const AccountTypeLabelToId = [
  [EventScenarioLabel.BreachedAcct, 'hacked-acct-type'],
  [EventScenarioLabel.LockedAcct, 'locked-acct-type'],
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

export const [decodeSocialAccountTypeQuestion, SocialAccountTypeQuestionList] = getAnswerDecoderAndLabels([
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
  [EventScenarioLabel.BreachedAcct, 'hacked-soc-type'],
  [EventScenarioLabel.LockedAcct, 'locked-soc-type'],
] as const;


export enum FinancialAccountTypeQuestion {
  CreditCard = "Credit Card",
  CreditUnion = "Credit Union",
  Retirement = "Retirement",
  Brokerage = "Brokerage",
  Paypal = "Paypal",
  Venmo = "Venmo",
  Cryptocurrency = "Cryptocurrency",
  Bank = "Bank",
  Other = "Other",
};

export const [decodeFinancialAccountTypeQuestion, FinancialAccountTypeQuestionList] = getAnswerDecoderAndLabels([
  
  ["credit card", FinancialAccountTypeQuestion.CreditCard],
  ["credit union", FinancialAccountTypeQuestion.CreditUnion],
  ["retirement", FinancialAccountTypeQuestion.Retirement],
  ["brokerage", FinancialAccountTypeQuestion.Brokerage],
  ["paypal", FinancialAccountTypeQuestion.Paypal],
  ["venmo", FinancialAccountTypeQuestion.Venmo],
  ["cryptocurrency", FinancialAccountTypeQuestion.Cryptocurrency],
  ["bank", FinancialAccountTypeQuestion.Bank],
  ["Other", FinancialAccountTypeQuestion.Other],
]);

export const FinancialAccountTypeLabelToId = [
  [EventScenarioLabel.BreachedAcct, 'hacked-bank-type'],
  [EventScenarioLabel.LockedAcct, 'locked-bank-type'],
] as const;