export interface SurveyRoot {
  SurveyEntry: SurveyEntry;
  SurveyElements: SurveyElement[];
}

export interface SurveyEntry {
  SurveyID: string;
  SurveyName: string;
  SurveyDescription: string;
  SurveyOwnerID: string;
  SurveyBrandID: string;
  DivisionID: string;
  SurveyLanguage: string;
  SurveyActiveResponseSet: string;
  SurveyStatus: string;
  SurveyStartDate: string;
  SurveyExpirationDate: string;
  SurveyCreationDate: string;
  CreatorID: string;
  LastModified: string;
  LastAccessed: string;
  LastActivated: string;
  Deleted: unknown;
}


export interface SurveyElement {
  SurveyID: string;
  Element: string;
  PrimaryAttribute: string;
  SecondaryAttribute?: string;
  TertiaryAttribute?: string;
  Payload: unknown;
}

export interface SurveyQuestion extends SurveyElement {
	Payload: SurveyQuestionPayload;
}


export interface SurveyQuestionPayload {
  QuestionText: string;
  DefaultChoices?: boolean;
  DataExportTag: string;
  QuestionID: QuestionId;
  QuestionType: string;
  Selector: string;
  DataVisibility?: DataVisibility;
  Configuration: Configuration;
  QuestionDescription: string;
  ChoiceOrder?: (number | `${number}`)[];
  Validation: Validation;
  GradingData?: unknown[];
  Language: unknown;
  NextChoiceId?: number;
  NextAnswerId?: number;
  SubSelector?: string;
  Choices?: Choices;
  QuestionText_Unsafe?: string;
  DisplayLogic?: DisplayLogic;
  Answers?: Answers;
  AnswerOrder?: string[];
  ChoiceDataExportTags?: boolean;
  SearchSource?: SearchSource;
  InPageDisplayLogic?: InPageDisplayLogic;
  RecodeValues?: RecodeValues;
  ReferenceQuestionConfig?: ReferenceQuestionConfig;
  SchemaConfig?: SchemaConfig;
  DynamicChoicesData?: unknown[];
}

export interface DataVisibility {
  Private: boolean
  Hidden: boolean
}

export interface Configuration {
  QuestionDescriptionOption: string
  TextPosition?: string
  ChoiceColumnWidth?: number
  WhiteSpace?: string
  MobileFirst?: boolean
  ChoiceColumnWidthPixels?: number
  RepeatHeaders?: string
  NumColumns?: number
  InputWidth?: number
  InputHeight?: number
  LabelPosition?: string
}

export interface Validation {
  Settings: Settings
}

export interface Settings {
  Type: string
  ForceResponse?: string
  ForceResponseType?: string
  MinChars?: string
  ValidDateType?: string
  ValidPhoneType?: string
  ValidZipType?: string
  ValidNumber?: ValidNumber
}

export interface ValidNumber {
  Min: string
  Max: string
  NumDecimals: string
}

export type Choices = Record<`${number}`, Choice>;

export interface Choice {
  Display: string
  ExclusiveAnswer?: boolean
  TextEntry?: string
  TextEntrySize?: string
}
type DisplayLogic = unknown;

// export interface DisplayLogic {
//   "0": N0
//   Type: string
//   inPage: boolean
// }


export type Answers = Record<`${number}`, Answer>;

export interface Answer {
  Display: string
}

export interface SearchSource {
  AllowFreeResponse: string
}

type InPageDisplayLogic = unknown;
// export interface InPageDisplayLogic {
//   Type: string
//   inPage: boolean
// }

export type RecodeValues = Record<`${number}`, string>;

export interface ReferenceQuestionConfig {
  instanceOf: InstanceOf
}

export interface InstanceOf {
  id: string
  version: string
}

export interface SchemaConfig {
  ChoiceMapping: ChoiceMapping
  ChoiceMappingType: string
  ChoiceTextMapping: ChoiceTextMapping
  ConfigVersion: string
  Reconfirm: boolean
  URL: string
  XMDConnect: boolean
}


export interface SurveyBlock extends SurveyElement {
	Payload: SurveyBlockPayload;
}

export type SurveyBlockPayload = Record<`${number}`, SurveyBlockPayloadEntry>;

export interface SurveyBlockPayloadEntry {
  Type: string;
  Description: string;
  ID: BlockId;
  BlockElements: BlockElement[];
  Options: Options;
  SubType?: string;
}

export interface BlockElement {
  Type: "Question" | unknown; // string
  QuestionID?: QuestionId
  SkipLogic?: SkipLogic[]
}

export interface SkipLogic {
  SkipLogicID: number
  ChoiceLocator: string
  Condition: string
  SkipToDestination: "ENDOFBLOCK" | string
  Locator: string
  SkipToDescription: string
  Description: string
  QuestionID: QuestionId
}

export interface Options {
  BlockLocking: unknown;
  RandomizeQuestions: string
  BlockVisibility: string
  PreviousButton?: string
  previousButtonMID?: string
  NextButton?: string
  nextButtonMID?: string
  previousButtonLibraryID?: string
  nextButtonLibraryID?: string
}

export type ChoiceMapping = Record<`${number}`, string>;
export type ChoiceTextMapping = Record<`${number}`, string>;

export interface SurveyFlow extends SurveyElement {
	Payload: SurveyFlowPayload;
}

export type SurveyFlowPayload = Flow & {type: "Root"};

export type FlowId = `FL_${string}`;
export type QuestionId = `QID${string}`;
export type BlockId = `BL_${string}`;

export interface Flow {
	/**
	 * "Standard" - a block
	 * "Group" - a group
	 * "BlockRandomizer" - a block randomizer with sub-flows
	 * "Root" - the root flow
	 */
  Type: "Root" | "Standard" | "BlockRandomizer" | "Group";
	/** The block ID at which the flow starts */
  ID?: BlockId; // set for Standard and BlockRandomizer
  FlowID: FlowId;
  Autofill?: undefined[];
  SubSet?: number;
  Flow?: Flow[] | Flow;
  Properties: Properties
  Description?: string;
}

export interface Properties {
  Count: number
  RemovedFieldsets: unknown[]
}
