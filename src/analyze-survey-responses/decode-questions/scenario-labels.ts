import { SurveyKey, SurveyKeysPilot7 } from "../survey-keys/index.ts";

export const ScenarioLabel = {
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

export type ScenarioLabel = typeof ScenarioLabel[keyof typeof ScenarioLabel];

export const ScenarioLabels = [
	ScenarioLabel.HackedDevice,
	ScenarioLabel.LockedDevice,
	ScenarioLabel.HackedAcct,
	ScenarioLabel.LockedAcct,
	ScenarioLabel.HackedSocial,
	ScenarioLabel.LockedSocial,
	ScenarioLabel.HackedFinancial,
	ScenarioLabel.LockedFinancial,
	ScenarioLabel.HackedPwds,
	ScenarioLabel.LockedPwds,
	ScenarioLabel.ReplacedOrUpgraded,
	ScenarioLabel.BrokenPromise,
] as const;

export const ScenarioLabelSurveyKeyPairs = [
	[ScenarioLabel.HackedDevice, SurveyKeysPilot7['hacked-device']],
	[ScenarioLabel.LockedDevice, SurveyKeysPilot7['locked-device']],
	[ScenarioLabel.HackedAcct, SurveyKeysPilot7['hacked-acct']],
	[ScenarioLabel.LockedAcct, SurveyKeysPilot7['locked-acct']],
	[ScenarioLabel.HackedSocial, SurveyKeysPilot7['hacked-soc']],
	[ScenarioLabel.LockedSocial, SurveyKeysPilot7['locked-soc']],
	[ScenarioLabel.HackedFinancial, SurveyKeysPilot7['hacked-bank']],
	[ScenarioLabel.LockedFinancial, SurveyKeysPilot7['locked-bank']],
	[ScenarioLabel.HackedPwds, SurveyKeysPilot7['hacked-pwds']],
	[ScenarioLabel.LockedPwds, SurveyKeysPilot7['locked-pwds']],
	[ScenarioLabel.ReplacedOrUpgraded, SurveyKeysPilot7['swap-device']],
	[ScenarioLabel.BrokenPromise, SurveyKeysPilot7['disconnect']],
 ] as const satisfies [ScenarioLabel, SurveyKey][];

export const ScenarioLabelSurveyKeyMatchPairs = ScenarioLabelSurveyKeyPairs.map( ([label, key]) => [label, `${key}-match`] as const satisfies [ScenarioLabel, SurveyKey]);
export const ScenarioLabelSurveyKeyInsertPairs = ScenarioLabelSurveyKeyPairs.map( ([label, key]) => [label, `${key}-insert`] as const satisfies [ScenarioLabel, SurveyKey]);

export const ScenarioLabelToSurveyKey = Object.fromEntries(ScenarioLabelSurveyKeyPairs) as Record<ScenarioLabel, SurveyKey>;
export const ScenarioLabelToMatchSurveyKey = Object.fromEntries(ScenarioLabelSurveyKeyMatchPairs) as Record<ScenarioLabel, SurveyKey>;
export const ScenarioLabelToInsertSurveyKey = Object.fromEntries(ScenarioLabelSurveyKeyInsertPairs) as Record<ScenarioLabel, SurveyKey>;
