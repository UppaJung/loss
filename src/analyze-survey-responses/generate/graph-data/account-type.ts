import type { AugmentedSurveyResponses, SurveyKey } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { AccountTypeQuestionList, FinancialAccountTypeQuestionList, SocialAccountTypeQuestionList, decodeAccountTypeQuestion, decodeFinancialAccountTypeQuestion, decodeSocialAccountTypeQuestion } from "../../decode-questions/account-type.ts";
import { decodeAndTallyResponsesForScenarioRecognizedByParticipant } from "./common/decodeAndTallyResponsesForScenarioRecognizedByParticipant.ts";

export const accountTypeData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {
  // const decodeAndTallyResponses = <LABEL extends string>(key: SurveyKey, decodeFn: (answer: string) => LABEL | undefined): Partial<Record<LABEL, number>> =>
  // 	tallyResponses(filterNull(responses.map( response => response[key]).map( decodeFn )));
  const data = {
    emailAccount: decodeAndTallyResponsesForScenarioRecognizedByParticipant(AccountTypeQuestionList, `acct`, decodeAccountTypeQuestion, responses),
    socialAccount: decodeAndTallyResponsesForScenarioRecognizedByParticipant(SocialAccountTypeQuestionList, `soc`, decodeSocialAccountTypeQuestion, responses),
    financialAccount: decodeAndTallyResponsesForScenarioRecognizedByParticipant(FinancialAccountTypeQuestionList, `bank`, decodeFinancialAccountTypeQuestion, responses),
  };
  const { warningHeaderTs, codeFileNameWithoutExtension } = getReflectedCodeFileInfo({ 'import.meta.url': import.meta.url });


  Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs}export const data = ${JSON.stringify(data, undefined, "\t")};${"\n"}`);
};
