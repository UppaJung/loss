import * as QSF from "./types.d.ts";

export const ElementCodes = {
	SurveyFlow: "FL",
	SurveyBlock: "BL",
	SurveyOptions: "SO",
	SurveyQuestion: "SQ",	
}

export const isSurveyFlow = (element: QSF.SurveyElement): element is QSF.SurveyFlow =>
	element.Element === ElementCodes.SurveyFlow;

export const isSurveyQuestion = (element: QSF.SurveyElement): element is QSF.SurveyQuestion =>
	element.Element === ElementCodes.SurveyQuestion;

export const isSurveyBlock = (element: QSF.SurveyElement): element is QSF.SurveyBlock =>
	element.Element === ElementCodes.SurveyBlock;
