import { getAnswerDecoderAndLabels, getMultipleAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";


//The account was used by someone I knew with my permission, but they used it in a way that they knew I would not want
//The account was used by someone I knew with my permission, but they used it in a way that I would not have permitted if asked
//The account was used in a way that I I would have permitted at the time, but later regretted
//The account was used by someone I knew without my permission
//The account was accessed by someone I did not know
//other (please describe)

//hacked-acct-how
export enum HackedAccountHowLabels {
  KnowinglyAbusedPermittedAccess = 'Knowingly-Abused Access',
  UnknowinglyAbusedPermittedAccess = 'Unknowingly-Abused Access',
  RegrettedPermitting = "Regretted Permitting",
  UnauthorizedKnownPerson = 'Unauthorized Access (known person)',
  UnauthorizedAccessUnknownPerson = "Unauthorized Access (unknown person)",
  Other = 'Other',
};

export const [decodeHackedAccountHow, HackedAccountHowList] = getAnswerDecoderAndLabels([
  ["they knew I would not want", HackedAccountHowLabels.KnowinglyAbusedPermittedAccess],
  ["used it in a way that I would not have permitted if asked", HackedAccountHowLabels.UnknowinglyAbusedPermittedAccess], 
  ["but later regretted", HackedAccountHowLabels.RegrettedPermitting], 
  ["used by someone I knew without my permission", HackedAccountHowLabels.UnauthorizedKnownPerson], 
  ["accessed by someone I did not know", HackedAccountHowLabels.UnauthorizedAccessUnknownPerson], 
  ["other", HackedAccountHowLabels.Other], 
]);


//Google Account (Gmail, Google Drive, etc.)
//Microsoft Account (Hotmail, Outlook, OneDrive, Microsoft 365, etc.)
//Apple (Apple ID, iCloud, etc.)
//Other (please describe)
export enum AccountTypeLabels {
  Google = 'Google',
  Microsoft = 'Microsoft',
  Apple = "Apple",
  Other = 'Other',
};

// hacked-acct-type
export const [decodeAccountType, AccountTypeList] = getAnswerDecoderAndLabels([
  ["Google", AccountTypeLabels.Google], 
  ["Microsoft", AccountTypeLabels.Microsoft], 
  ["Apple", AccountTypeLabels.Apple], 
  ["Other", AccountTypeLabels.Other], 
]);


//less than a day
//between a day and a week
//more than a week, but I eventually did recover the account
//I never recovered the account
//Other (please describe)
export enum RecoveryDurationLabels {
  NeverLost = 'Never Lost',
  WithinDay = 'Within a Day',
  WithinWeek = 'Within a Week',
  Eventually = "Eventually",
  Never = "Never Regained",
  Other = 'Other',
};

// hacked-acct-rec
export const [decodeHackedAccountRecoveryDuration, RecoveryDurationList] = getAnswerDecoderAndLabels([
  ["never lost", RecoveryDurationLabels.NeverLost], 
  ["less than a day", RecoveryDurationLabels.WithinDay], 
  ["a day and a week", RecoveryDurationLabels.WithinWeek], 
  ["eventually", RecoveryDurationLabels.Eventually], 
  ["never regained", RecoveryDurationLabels.Never], 
  ["Other", RecoveryDurationLabels.Other], 
]);

// hacked-acct-rec
export const [decodeLockedAccountRecoveryDuration] = getAnswerDecoderAndLabels([
  ["never lost", RecoveryDurationLabels.NeverLost], 
  ["less than a day", RecoveryDurationLabels.WithinDay], 
  ["a day and a week", RecoveryDurationLabels.WithinWeek], 
  ["not permanently", RecoveryDurationLabels.Eventually], 
  ["never regained", RecoveryDurationLabels.Never], 
  ["Other", RecoveryDurationLabels.Other], 
]);

export const [decodeRecoveryDuration] = getAnswerDecoderAndLabels([
  ["less than a day", RecoveryDurationLabels.WithinDay], 
  ["a day and a week", RecoveryDurationLabels.WithinWeek], 
  ["eventually", RecoveryDurationLabels.Eventually], 
  ["never fully", RecoveryDurationLabels.Never], 
  ["Other", RecoveryDurationLabels.Other], 
]);


export enum BankAccountTypeLabels {

  CreditCard='Credit Card',
  CreditUnion='Credit Union',
  Retirement='Retirement',
  Brokerage='Brokerage',
  Paypal='Paypal',
  Venmo='Venmo',
  Cryptocurrency='Cryptocurrency',
  Bank='Bank',
  Other='Other',
};

// hacked-bank-type
export const [decodeBankAccountType, BankAccountTypeList] = getAnswerDecoderAndLabels([
  ["Credit Card", BankAccountTypeLabels.CreditCard], 
  ["Credit Union", BankAccountTypeLabels.CreditUnion], 
  ["Retirement", BankAccountTypeLabels.Retirement], 
  ["Brokerage", BankAccountTypeLabels.Brokerage], 
  ["Paypal", BankAccountTypeLabels.Paypal], 
  ["Venmo", BankAccountTypeLabels.Venmo], 
  ["Cryptocurrency", BankAccountTypeLabels.Cryptocurrency], 
  ["Bank", BankAccountTypeLabels.Bank], 
  ["Other", BankAccountTypeLabels.Other], 
]);


export enum SocialAccountTypeLabels {
  Facebook='Facebook',
  Instagram='Instagram',
  Twitter='Twitter/X',
  SnapChat='SnapChat',
  WhatsApp='WhatsApp',
  WeChat='WeChat',
  Signal='Signal',
  Other='Other',
};

// hacked-Social-type
export const [decodeSocialAccountType, SocialAccountTypeList] = getAnswerDecoderAndLabels([
  ["Facebook",SocialAccountTypeLabels.Facebook],
  ["Instagram",SocialAccountTypeLabels.Instagram],
  ["Twitter/X",SocialAccountTypeLabels.Twitter],
  ["SnapChat",SocialAccountTypeLabels.SnapChat],
  ["WhatsApp",SocialAccountTypeLabels.WhatsApp],
  ["WeChat",SocialAccountTypeLabels.WeChat],
  ["Signal",SocialAccountTypeLabels.Signal],
  ["Other",SocialAccountTypeLabels.Other]
]);



// Locked account

// I forgot a PIN or password
// the correct PIN or password no longer worked
// I lost access to a phone number used to verify my account
// I lost access to a device used to verify my account
// I lost access to the password manager in which I had stored the password
// I lost the paper on which I had written down the password
// I lost the electronic file or document in which I had stored the password
// the account was locked or deleted because I had not used it for a long time
// other (please describe)
export enum LockedAccountHowLabels {
  Forgot = 'Forgot PIN/Password',
  NoLongerWorked = 'PIN/Password No Longer Worked',
  PhoneNumberLost = 'Phone Number Lost',
  DeviceLost = 'Device Lost',
  PasswordManagerLost = 'Password Manager Lost',
  PaperLost = "Paper Lost",
  ElectronicFileLost = "Electronic File Lost",
  Disuse = "Disuse",
  Other = 'Other',
}

export const [decodeLockedAccountHow, LockedAccountHowList] = getMultipleAnswerDecoderAndLabels([
  ["forgot", LockedAccountHowLabels.Forgot],
  ["password no longer worked", LockedAccountHowLabels.NoLongerWorked],
  ["lost access to a phone number", LockedAccountHowLabels.PhoneNumberLost],
  ["lost access to a device", LockedAccountHowLabels.DeviceLost],
  ["lost access to the password manager", LockedAccountHowLabels.PasswordManagerLost],
  ["lost the paper", LockedAccountHowLabels.PaperLost],
  ["lost the electronic file", LockedAccountHowLabels.ElectronicFileLost],
  ["had not used it", LockedAccountHowLabels.Disuse],
  ["other (please describe)", LockedAccountHowLabels.Other],
]);