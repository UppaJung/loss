import { AnswerToMatchingQuestionList, AnswerToMatchingQuestion, decodeMatchingQuestion, MatchingScenariosLabelToId } from "../decode-questions/matching-question.ts";
import { countAndPercentMacroSet, numberMacro } from "../latex.ts";
import { tallyResponses, TotalAnswered } from "../utilities/tallyResponses.ts";
import { aggregateResponses } from "../utilities/aggregateResponses.ts";

export const generateScenarioMatchingQuestionMacros = (outPath: string, responses: Record<string, string>[]) => {
  const macros = [] as string[];

  for (const [questionName, questionId] of MatchingScenariosLabelToId) {
    const answers = tallyResponses(responses.map(response => decodeMatchingQuestion(response[questionId])).filter(r => r != null) as NonNullable<ReturnType<typeof decodeMatchingQuestion>>[]);
    macros.push(
      numberMacro(`${questionName}${`Answered`}`, answers[TotalAnswered] ?? 0),
      ...countAndPercentMacroSet(`${questionName}${`Yes`}`,
        aggregateResponses(answers, AnswerToMatchingQuestion.MatchedTopThree, AnswerToMatchingQuestion.AddToTopThree, AnswerToMatchingQuestion.BelowTopThree), answers._totalAnswered ?? 0),
      ...countAndPercentMacroSet(`${questionName}${`No`}`,
        aggregateResponses(answers, AnswerToMatchingQuestion.CouldHappen, AnswerToMatchingQuestion.Impossible), answers._totalAnswered ?? 0),
      ...AnswerToMatchingQuestionList
        .map((answer) => countAndPercentMacroSet(
          `${questionName}${answer}` as const,
          answers[answer] ?? 0,
          answers[TotalAnswered] ?? 0
        )).flat()
    );
    Deno.writeTextFileSync(`${outPath}/scenario-matching-question.tex`, macros.join("\n"));
  }
};
