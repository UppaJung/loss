export type AnswerSpecifier<T extends string=string> = [string | RegExp, T];

export function decodeAnswer<T extends string = string>(specifiers: AnswerSpecifier<T>[]) : (answer: string) => T | undefined {
  return (answer: string = "", throwExceptionIfValueUnexpected?: boolean) => {
    const answerLc = answer.toLocaleLowerCase();
    const result = specifiers.reduce<T | undefined>((responseAlreadyFound, [specifier, response]) => {
      const satisfiesSpecifier = specifier instanceof RegExp ? specifier.test(answer) : (answerLc.indexOf(specifier.toLocaleLowerCase()) >= 0);
      if (satisfiesSpecifier && responseAlreadyFound != null) {
        throw new Error(`Answer "${answer}" matches both "${responseAlreadyFound}" and "${response}"`);
      }
      return satisfiesSpecifier ? response : responseAlreadyFound;
    }, undefined)
      ?? ((answer === "") ? undefined :
        (throwExceptionIfValueUnexpected !== true) ? (() => {
          console.log((`Answer "${answer}" did not map to any of ${specifiers.map(([spec, response]) => `'${spec.toString()}'=>'${response}'`).join(", ")}`));
          return undefined;
        })() :
      (() => {
          throw new Error(`Answer "${answer}" did not map to any of ${specifiers.map(([_, response]) => `"${response}"`).join(", ")}`);
      })());
    // console.log(`validated ${answer} as ${result ?? "?"} from ${specifiers.map(([_, response]) => `"${response}"`).join(", ")}`);
    return result;
  }
}

/**
 * Create a answer decoding function that converts a survey response string (e.g. "Yes, I agree") to a label string ("Yes"),
 * and also outputs a list of all label strings
 * @param specifiers An array of two-item tuples, each of which contains a specifier followed by a label string.
 * If the specifier is a string, it will match if the response string contains the specifier string (case-insensitive).
 * If the specifier is a regular expression, it will match if the response string contains a match for the regular expression
 * (when specifier.test(answer) is called).
 * @returns A tuple containing the `validate` function followed by the array of valid tuples
 */
export const getAnswerDecoderAndLabels = <T extends string = string>(specifiers: AnswerSpecifier<T>[]) => {
  const decode = decodeAnswer(specifiers);
  const labels = specifiers.map(([_, label]) => label);
  return [decode, labels] as const;
}
