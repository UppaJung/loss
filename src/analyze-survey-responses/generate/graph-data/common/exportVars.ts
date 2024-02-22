
export const exportVars = (toExport: Record<string, unknown>) => Object.entries(toExport).map(([key, value]) => `\texport const ${key.replaceAll(' ', '')} = ${JSON.stringify(value, undefined, "\t")};\n`).join("");
