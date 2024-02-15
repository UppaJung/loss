import { SurveyKeysPilot6 } from "./pilot6.ts";
import { SurveyKeysPilot7 } from "./pilot7.ts";

export {SurveyKeysPilot6, SurveyKeysPilot7};
export const SurveyKeys = SurveyKeysPilot7;
export type SurveyKey = SurveyKeysPilot6 | SurveyKeysPilot7;

export type SurveyResponse<SURVEY_KEY extends SurveyKey> = Record<SURVEY_KEY, string>;
export type AugmentedSurveyResponse<SURVEY_KEY extends SurveyKey> = SurveyResponse<SURVEY_KEY> & {
	participantId: string;
	startDate: Date;
//	calendarYearsSinceBirth: number;
}
export type SurveyResponses<SURVEY_KEY extends SurveyKey> = ({StartDate: string; birthyear: string;} & SurveyResponse<SURVEY_KEY>)[];
export type AugmentedSurveyResponses<SURVEY_KEY extends SurveyKey = SurveyKeysPilot7> = AugmentedSurveyResponse<SURVEY_KEY>[];

export const augmentSurveyResponses = <SURVEY_KEY extends SurveyKey> (responses:  SurveyResponses<SURVEY_KEY>): AugmentedSurveyResponses<SURVEY_KEY> =>
	responses.map( (response, index) =>
		({...response,
			participantId: `${index + 1}`,
			startDate: new Date(response.StartDate),
//			calendarYearsSinceBirth: new Date().getFullYear() - parseInt(response.birthyear),
		})
	);
