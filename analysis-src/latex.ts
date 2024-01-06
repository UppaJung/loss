
export const newCommand = <NAME extends string = string, VALUE extends string = string>(
	name: NAME, value: VALUE
) =>
	`\\newcommand*{\\${name.replace(/[^a-z]/gi, '')}}{${value}}` as const;
export const numberMacro = <NAME extends string = string, COUNT extends number = number>(
	name: NAME, count: COUNT
) =>
	newCommand(name, `${count}` as const);
export const percentMacro = <NAME extends string = string, COUNT extends number = number, OUT_OF extends number = number
>(
	name: NAME, count: COUNT, outOf: OUT_OF
) =>
	newCommand(name, `${Math.round(100 * count / outOf)}\\%` as const);
export const countAndPercentMacroSet = <NAME extends string = string, COUNT extends number = number, OUT_OF extends number = number
>(
	name: NAME, count: COUNT, outOf: OUT_OF
) => ([
	numberMacro(`${name}` as const, count),
	numberMacro(`${name}OutOf` as const, outOf),
	percentMacro(`${name}Percent` as const, count, outOf),
	newCommand(`${name}Expr` as const, `${count} of ${outOf} (${Math.round(100 * count / outOf)}\\%)` as const),
	newCommand(`${name}ExprNoDenom` as const, `${count} (${Math.round(100 * count / outOf)}\\%)` as const),
] as const);
