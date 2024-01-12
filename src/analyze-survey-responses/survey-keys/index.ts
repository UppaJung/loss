import { SurveyKeysPilot6 } from "./pilot6.ts";

export const SurveyKeys = SurveyKeysPilot6;
export type SurveyKey = typeof SurveyKeys[keyof typeof SurveyKeys];

export type SurveyResponse<SURVEY_KEY extends string = SurveyKey> = Record<SURVEY_KEY, string>;
export type AugmentedSurveyResponse<SURVEY_KEY extends string = SurveyKey> = SurveyResponse<SURVEY_KEY> & {
	participantId: string;
	startDate: Date;
}
export type SurveyResponses<SURVEY_KEY extends string = SurveyKey> = SurveyResponse<SURVEY_KEY>[];
export type AugmentedSurveyResponses<SURVEY_KEY extends string = SurveyKey> = AugmentedSurveyResponse<SURVEY_KEY>[];

export const augmentSurveyResponses = (responses: SurveyResponses): AugmentedSurveyResponses =>
	responses.map( (response, index) =>
		({...response, participantId: `${index + 1}`, startDate: new Date(response.StartDate)})
	);
