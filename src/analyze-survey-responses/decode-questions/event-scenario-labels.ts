import { SurveyKey, SurveyKeys } from "../survey-keys/index.ts";

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
] as const;

export const EventScenarioLabelSurveyKeyPairs = [
	[EventScenarioLabel.HackedDevice, SurveyKeys['hacked-device']],
	[EventScenarioLabel.LockedDevice, SurveyKeys['locked-device']],
	[EventScenarioLabel.HackedAcct, SurveyKeys['hacked-acct']],
	[EventScenarioLabel.LockedAcct, SurveyKeys['locked-acct']],
	[EventScenarioLabel.HackedSocial, SurveyKeys['hacked-soc']],
	[EventScenarioLabel.LockedSocial, SurveyKeys['locked-soc']],
	[EventScenarioLabel.HackedFinancial, SurveyKeys['hacked-bank']],
	[EventScenarioLabel.LockedFinancial, SurveyKeys['locked-bank']],
	[EventScenarioLabel.HackedPwds, SurveyKeys['hacked-pwds']],
	[EventScenarioLabel.LockedPwds, SurveyKeys['locked-pwds']],
	[EventScenarioLabel.ReplacedOrUpgraded, SurveyKeys['swap-device']],
	[EventScenarioLabel.BrokenPromise, SurveyKeys['disconnect']],
 ] as const satisfies [EventScenarioLabel, SurveyKey][];

export const EventScenarioLabelSurveyKeyMatchPairs = EventScenarioLabelSurveyKeyPairs.map( ([label, key]) => [label, `${key}-match`] as const satisfies [EventScenarioLabel, SurveyKey]);
export const EventScenarioLabelSurveyKeyInsertPairs = EventScenarioLabelSurveyKeyPairs.map( ([label, key]) => [label, `${key}-insert`] as const satisfies [EventScenarioLabel, SurveyKey]);

export const EventScenarioLabelToSurveyKey = Object.fromEntries(EventScenarioLabelSurveyKeyPairs) as Record<EventScenarioLabel, typeof EventScenarioLabelSurveyKeyPairs[number][1]> satisfies Record<EventScenarioLabel, SurveyKey>;
export const EventScenarioLabelToMatchSurveyKey = Object.fromEntries(EventScenarioLabelSurveyKeyMatchPairs) as Record<EventScenarioLabel, typeof EventScenarioLabelSurveyKeyMatchPairs[number][1]> satisfies Record<EventScenarioLabel, SurveyKey>;
export const EventScenarioLabelToInsertSurveyKey = Object.fromEntries(EventScenarioLabelSurveyKeyInsertPairs) as Record<EventScenarioLabel, typeof EventScenarioLabelSurveyKeyInsertPairs[number][1]> satisfies Record<EventScenarioLabel, SurveyKey>;
