import { getAnswerDecoderAndLabels } from "../common/getAnswerDecoderAndLabels.ts";

/*
Less than high school degree
High school graduate (high school diploma or equivalent including GED)
Some college but no degree
Associate degree in college (2-year)
Bachelor's degree in college (4-5 year)
Master's degree
Doctoral degree
Professional degree (JD, MD)
Prefer not to answer
*/
export enum EducationLabels {
  LessThanHighSchool = "< High School",
  HighSchool = "High School",
  SomeCollege = "Some College",
  AssociateDegree = "Associate",
  BachelorDegree = "Bachelor's",
  MasterDegree = "Master's",
  ProfessionalDegree = "Professional",
  DoctoralDegree = "Doctoral",
  PreferNotToAnswer = "Decline to Answer",
};


export const [decodeEducationLabels, EducationLabelList] = getAnswerDecoderAndLabels([
  ["less than high school", EducationLabels.LessThanHighSchool],
  ["high school graduate", EducationLabels.HighSchool],
  ["some college", EducationLabels.SomeCollege],
  ["associate degree", EducationLabels.AssociateDegree],
  ["bachelor's degree", EducationLabels.BachelorDegree],
  ["master's degree", EducationLabels.MasterDegree],
  ["professional degree", EducationLabels.ProfessionalDegree],
  ["doctoral degree", EducationLabels.DoctoralDegree],
  ["prefer not to answer", EducationLabels.PreferNotToAnswer],
]);

/*
Male
Female
Non-binary / third gender
Prefer to self-describe
Prefer not to say
*/
export enum GenderLabels {
  Male = "Male",
  Female = "Female",
  NonBinary = "Non-binary/third",
  SelfDescribe = "Self-describe",
  PreferNotToSay = "Prefer not to say",
}

export const [decodeGenderLabels, GenderLabelList] = getAnswerDecoderAndLabels([
  [/^Male$/, GenderLabels.Male],
  ["female", GenderLabels.Female],
  ["non-binary", GenderLabels.NonBinary],
  ["self-describe", GenderLabels.SelfDescribe],
  ["prefer not to", GenderLabels.PreferNotToSay],
]);

export const decodeCalendarYearsSinceBirthFromBirthYearString = (dateOfSurvey: Date = new Date()) => (birthYearStr: string) => {
  let birthYear = parseInt(birthYearStr);
  const surveyYear = dateOfSurvey.getFullYear();
  if (birthYear < 100) {
    const surveyCentury = Math.floor(surveyYear / 100) * 100;
    birthYear = surveyCentury + birthYear;
    if (surveyCentury + birthYear > surveyYear) {
      birthYear -= 100;
    }
  }
  if (isNaN(birthYear)) {
    return undefined;
  }
  const ceilingAge = surveyYear - birthYear;
  return ceilingAge;
}