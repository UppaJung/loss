import { AnswerToMatchingQuestionList, AnswerToMatchingQuestion, decodeMatchingQuestion, MatchingScenariosLabelToId } from "../../decode-questions/matching-question.ts";
import { countAndPercentMacroSet, numberMacro } from "../../common/latex.ts";
import { tallyResponses, TotalAnswered } from "../../common/tallyResponses.ts";
import { aggregateResponses } from "../../common/aggregateResponses.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { SurveyKeysPilot7 } from "../../survey-keys/index.ts";

export const generateScenarioMatchingQuestionMacros = (outPath: string, responses: AugmentedSurveyResponses<SurveyKeysPilot7>) => {
  const macros = [] as string[];

  for (const [questionName, questionId] of MatchingScenariosLabelToId) {
    const answers = tallyResponses(responses.map(response => decodeMatchingQuestion(response[questionId])).filter(r => r != null) as NonNullable<ReturnType<typeof decodeMatchingQuestion>>[]);
    macros.push(
      numberMacro(`${questionName}${`Answered`}`, answers[TotalAnswered] ?? 0),
      ...countAndPercentMacroSet(`${questionName}${`Yes`}`,
        aggregateResponses(answers, AnswerToMatchingQuestion.MatchedTopThree, AnswerToMatchingQuestion.AddToTopThree, AnswerToMatchingQuestion.BelowTopThree), answers[TotalAnswered] ?? 0),
      ...countAndPercentMacroSet(`${questionName}${`No`}`,
        aggregateResponses(answers, AnswerToMatchingQuestion.CouldHappen, AnswerToMatchingQuestion.Impossible), answers[TotalAnswered] ?? 0),
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
