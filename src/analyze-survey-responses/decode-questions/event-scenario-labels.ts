import { SurveyKey } from "../survey-keys/index.ts";

export const EventScenarioLabel = {
	HackedDevice: 'Hacked Device',
	LockedDevice: 'Locked Device',
	HackedAcct: 'Hacked Account',
	LockedAcct: 'Locked Account',
	HackedSocial: 'Hacked Social',
	LockedSocial: 'Locked Social',
	HackedFinancial: 'Hacked Financial',
	LockedFinancial: 'Locked Financial',
	HackedPwds: 'Hacked Passwords',
	LockedPwds: 'Locked Passwords',
	ReplacedOrUpgraded: 'Replaced Device/OS',
	BrokenPromise: 'Broken Promise',
	Abuse: "Abuse",
} as const;

export type EventScenarioLabel = typeof EventScenarioLabel[keyof typeof EventScenarioLabel];

export const EventScenarioLabels = [
	EventScenarioLabel.HackedDevice,
	EventScenarioLabel.LockedDevice,
	EventScenarioLabel.HackedAcct,
	EventScenarioLabel.LockedAcct,
	EventScenarioLabel.HackedSocial,
	EventScenarioLabel.LockedSocial,
	EventScenarioLabel.HackedFinancial,
	EventScenarioLabel.LockedFinancial,
	EventScenarioLabel.HackedPwds,
	EventScenarioLabel.LockedPwds,
	EventScenarioLabel.ReplacedOrUpgraded,
	EventScenarioLabel.BrokenPromise,
	EventScenarioLabel.Abuse,
] as const;

export const EventScenarioBaseLabelSurveyKeyPairs = [
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
	[EventScenarioLabel.Abuse, 'abuse'],
 ] as const;

 export const EventScenarioLabelSurveyKeyPairs = 
	EventScenarioBaseLabelSurveyKeyPairs.map( ([label, key]) => [label, `${key}?`] as const satisfies [EventScenarioLabel, SurveyKey]);
	export const EventScenarioLabelToSurveyKey = Object.fromEntries(EventScenarioLabelSurveyKeyPairs) as Record<EventScenarioLabel, typeof EventScenarioLabelSurveyKeyPairs[number][1]> satisfies Record<EventScenarioLabel, SurveyKey>;
