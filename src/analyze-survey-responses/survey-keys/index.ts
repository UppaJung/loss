import { SurveyKeyPilot6, SurveyKeysPilot6 } from "./pilot6.ts";
import { SurveyKeyPilot7, SurveyKeysPilot7 } from "./pilot7.ts";
import { SurveyKeyPilot8, SurveyKeysPilot8 } from "./pilot8.ts";
import { SurveyKeyPilot9, SurveyKeysPilot9 } from "./pilot9.ts";

type AugmentedResponseKeys = "participantId" | "startDate";

export {SurveyKeysPilot6, SurveyKeysPilot7, SurveyKeysPilot8};
export type { SurveyKeyPilot6, SurveyKeyPilot7, SurveyKeyPilot8, SurveyKeyPilot9 }
export type SurveyKeyAll = SurveyKeyPilot6 | SurveyKeyPilot7 | SurveyKeyPilot8 | SurveyKeyPilot9 | AugmentedResponseKeys;
export type SurveyKeyLatest = SurveyKeyPilot9 | AugmentedResponseKeys;

export const SurveyKeys = SurveyKeysPilot9;
export type SurveyKey = SurveyKeyLatest;

export type SurveyResponse<SURVEY_KEY extends SurveyKeyAll> = Record<SURVEY_KEY, string>;
export type AugmentedSurveyResponse<SURVEY_KEY extends SurveyKeyAll = SurveyKey> = SurveyResponse<SURVEY_KEY> & {
	participantId: string;
	startDate: Date;
//	calendarYearsSinceBirth: number;
}
export type SurveyResponses<SURVEY_KEY extends SurveyKeyAll> = ({StartDate: string; birthyear: string;} & SurveyResponse<SURVEY_KEY>)[];
export type AugmentedSurveyResponses<SURVEY_KEY extends SurveyKeyAll = SurveyKey> = AugmentedSurveyResponse<SURVEY_KEY>[];

export const augmentSurveyResponses = <SURVEY_KEY extends SurveyKeyAll> (responses:  SurveyResponses<SURVEY_KEY>): AugmentedSurveyResponses<SURVEY_KEY> =>
	responses.map( (response, index) =>
		({...response,
			participantId: `${index + 1}`,
			startDate: new Date(response.StartDate),
//			calendarYearsSinceBirth: new Date().getFullYear() - parseInt(response.birthyear),
		})
	);
