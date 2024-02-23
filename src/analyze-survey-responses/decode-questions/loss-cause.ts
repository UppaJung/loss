


// "A phone storing the photos/videos was stolen",
// "A phone storing the photos/videos broke or failed",
// "A phone storing the photos/videos was lost",
// "A phone storing the photos/videos was upgraded to a new phone and the photos/videos were not copied over",
// "A (non-phone) camera storing the photos/videos was stolen, broke, or was lost",
// "A memory card storing the photos/videos was stolen, broken, or lost after being removed from the phone or camera that took the photos/videos",
// "The photos were stored by a family member, partner, or friend who died and did not leave me access to the account",
// "The photos were stored by a current or former family member, partner, or friend who is no longer sharing them with me",
// "A computer or hard drive storing the photos/videos broke or failed",
// "A computer or hard drive storing the photos/videos was lost",
// "A computer or hard drive storing the photos/videos was stolen",
// "A chat app storing the photos/videos were stored in a chat app lost or deleted them",
// "An online account that stored the photos/videos was compromised (hacked) and the photos/videos were deleted",
// "An online account that stored the photos/videos permanently locked me (or us) out",
// "An online account that stored the photos/videos was deleted because of disuse",
// "An online account that stored the photos/videos locked deleted because of lack of payment",
// "Other (please describe)"

import { getMultipleAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";

export enum PhotoLossCauseLabel {
	// A phone storing the photos/videos was stolen
	PhoneStolen = "Phone Stolen",
	// A phone storing the photos/videos broke or failed
	PhoneBroke = "Phone Broke",
	// A phone storing the photos/videos was lost
	PhoneLost = "Phone Lost",
	// A phone storing the photos/videos was upgraded to a new phone and the photos/videos were not copied over
	PhoneUpgraded = "Phone Upgraded",
	// A (non-phone) camera storing the photos/videos was stolen, broke, or was lost
	Camera = "Camera",
	// A memory card storing the photos/videos was stolen, broken, or lost after being removed from the phone or camera that took the photos/videos
	MemoryCard = "Memory Card",
	// The photos were stored by a family member, partner, or friend who died and did not leave me access to the account
	StoredByDeceased = "Stored By Deceased",
	// The photos were stored by a current or former family member, partner, or friend who is no longer sharing them with me
	StoredByEx = "Stored By Ex",
	// A computer or hard drive storing the photos/videos broke or failed
	ComputerBroke = "Computer Broke",
	// A computer or hard drive storing the photos/videos was lost
	ComputerLost = "Computer Lost",
	// A computer or hard drive storing the photos/videos was stolen
	ComputerStolen = "Computer Stolen",
	// A chat app storing the photos/videos were stored in a chat app lost or deleted them
	ChatApp = "Chat App",
	// An online account that stored the photos/videos was compromised (hacked) and the photos/videos were deleted
	AccountCompromised = "Account Compromised",
	// An online account that stored the photos/videos permanently locked me (or us) out
	AccountLocked = "Account Locked",
	// An online account that stored the photos/videos was deleted because of disuse
	AccountDisuse = "Account Disuse",
	// An online account that stored the photos/videos locked deleted because of lack of payment
	AccountPayment = "Lack of Payment",
	// Other (please describe)
  Other = 'Other',
};

export const [decodePhotoLossCause, PhotoLossCauseList] = getMultipleAnswerDecoderAndLabels([
	["A phone storing the photos/videos was stolen", PhotoLossCauseLabel.PhoneStolen],
	["A phone storing the photos/videos broke or failed", PhotoLossCauseLabel.PhoneBroke],
	["A phone storing the photos/videos was lost", PhotoLossCauseLabel.PhoneLost],
	["A phone storing the photos/videos was upgraded to a new phone and the photos/videos were not copied over", PhotoLossCauseLabel.PhoneUpgraded],
	["A (non-phone) camera storing the photos/videos was stolen, broke, or was lost", PhotoLossCauseLabel.Camera],
	["A memory card storing the photos/videos was stolen, broken, or lost after being removed from the phone or camera that took the photos/videos", PhotoLossCauseLabel.MemoryCard],
	["The photos were stored by a family member, partner, or friend who died and did not leave me access to the account", PhotoLossCauseLabel.StoredByDeceased],
	["The photos were stored by a current or former family member, partner, or friend who is no longer sharing them with me", PhotoLossCauseLabel.StoredByEx],
	["A computer or hard drive storing the photos/videos broke or failed", PhotoLossCauseLabel.ComputerBroke],
	["A computer or hard drive storing the photos/videos was lost", PhotoLossCauseLabel.ComputerLost],
	["A computer or hard drive storing the photos/videos was stolen", PhotoLossCauseLabel.ComputerStolen],
	["A chat app storing the photos/videos were stored in a chat app lost or deleted them", PhotoLossCauseLabel.ChatApp],
	["An online account that stored the photos/videos was compromised (hacked) and the photos/videos were deleted", PhotoLossCauseLabel.AccountCompromised],
	["An online account that stored the photos/videos permanently locked me (or us) out", PhotoLossCauseLabel.AccountLocked],
	["An online account that stored the photos/videos was deleted because of disuse", PhotoLossCauseLabel.AccountDisuse],
	["An online account that stored the photos/videos locked deleted because of lack of payment", PhotoLossCauseLabel.AccountPayment],
	["Other (please describe)", PhotoLossCauseLabel.Other],
]);



export enum EmailLossCauseLabel {
	// After leaving a school, I lost access to a school email account before I could make copies of my emails
	LeftSchool = "Left School",
	// After leaving a job, I lost access to personal emails I had exchanged via a work email account and had meant to make copies of
	LeftJob = "Left Job",
	// My personal email account was compromised (hacked) and the emails were deleted
	AccountCompromised = "Account Compromised",
	// I lost the password or other login information for my personal email account and was never able to unlock the account
	PasswordLost = "Password Lost",
	// My personal email account was permanently locked for other reasons
	AccountLocked = "Account Locked",
	// My personal email account was deleted because I hadn't been using it
	AccountDisuse = "Account Disuse",
	// My personal email account was deleted for lack of payment
	AccountPayment = "Lack of Payment",
	// A computer or hard drive storing the emails broke or failed
	ComputerBroke = "Computer Broke",
	// A computer or hard drive storing the emails was lost
	ComputerLost = "Computer Lost",
	// A computer or hard drive storing the emails was stolen
	ComputerStolen = "Computer Stolen",
	// Other (please describe)
  Other = 'Other',
};

export const [decodeEmailLossCause, EmailLossCauseList] = getMultipleAnswerDecoderAndLabels([
	["After leaving a school, I lost access to a school email account before I could make copies of my emails", EmailLossCauseLabel.LeftSchool],
	["After leaving a job, I lost access to personal emails I had exchanged via a work email account and had meant to make copies of", EmailLossCauseLabel.LeftJob],
	["My personal email account was compromised (hacked) and the emails were deleted", EmailLossCauseLabel.AccountCompromised],
	["I lost the password or other login information for my personal email account and was never able to unlock the account", EmailLossCauseLabel.PasswordLost],
	["My personal email account was permanently locked for other reasons", EmailLossCauseLabel.AccountLocked],
	["My personal email account was deleted because I hadn't been using it", EmailLossCauseLabel.AccountDisuse],
	["My personal email account was deleted for lack of payment", EmailLossCauseLabel.AccountPayment],
	["A computer or hard drive storing the emails broke or failed", EmailLossCauseLabel.ComputerBroke],
	["A computer or hard drive storing the emails was lost", EmailLossCauseLabel.ComputerLost],
	["A computer or hard drive storing the emails was stolen", EmailLossCauseLabel.ComputerStolen],
	["Other (please describe)", EmailLossCauseLabel.Other],
]);
