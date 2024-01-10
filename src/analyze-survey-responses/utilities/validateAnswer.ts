export type AnswerSpecifier<T extends string=string> = [string | RegExp, T];

export function validateAnswer<T extends string = string>(specifiers: AnswerSpecifier<T>[]): (answer: string) => T | undefined;
export function validateAnswer<T extends string = string>(specifiers: AnswerSpecifier<T>[], returnUndefinedIfValueUnexpected: true) : (answer: string) => T | undefined;
export function validateAnswer<T extends string = string>(specifiers: AnswerSpecifier<T>[], returnUndefinedIfValueUnexpected?: true) : (answer: string) => T | undefined {
  return (answer: string = "") => {
    const answerLc = answer.toLocaleLowerCase();
    const result = specifiers.reduce<T | undefined>((responseAlreadyFound, [specifier, response]) => {
      const satisfiesSpecifier = specifier instanceof RegExp ? specifier.test(answer) : (answerLc.indexOf(specifier.toLocaleLowerCase()) >= 0);
      if (satisfiesSpecifier && responseAlreadyFound != null) {
        throw new Error(`Answer "${answer}" matches both "${responseAlreadyFound}" and "${response}"`);
      }
      return satisfiesSpecifier ? response : responseAlreadyFound;
    }, undefined)
      ?? ((answer === "" || returnUndefinedIfValueUnexpected) ? undefined :
      (() => {
        console.log((`Answer "${answer}" did not map to any of ${specifiers.map(([spec, response]) => `'${spec.toString()}'=>'${response}'`).join(", ")}`));
        return undefined;
//          throw new Error(`Answer "${answer}" did not map to any of ${specifiers.map(([_, response]) => `"${response}"`).join(", ")}`);
      })());
    // console.log(`validated ${answer} as ${result ?? "?"} from ${specifiers.map(([_, response]) => `"${response}"`).join(", ")}`);
    return result;
  }
}

export const answerSpec = <T extends string = string>(specifiers: AnswerSpecifier<T>[]) => {
  const validate = validateAnswer(specifiers);
  const values = specifiers.map(([_, value]) => value);
  return [validate, values] as const;
}
