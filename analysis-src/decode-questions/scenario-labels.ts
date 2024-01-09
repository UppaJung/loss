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