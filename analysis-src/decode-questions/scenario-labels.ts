export const ScenarioLabel = {
	HackedDevice: 'Hacked Device',
	LockedDevice: 'Locked Device',
	HackedAcct: 'Hacked Acct',
	LockedAcct: 'Locked Acct',
	HackedSocial: 'Hacked Social',
	LockedSocial: 'Locked Social',
	HackedFinancial: 'Hacked Financial',
	LockedFinancial: 'Locked Financial',
	HackedPwds: 'Hacked Pwds',
	LockedPwds: 'Locked Pwds',
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
] as const;