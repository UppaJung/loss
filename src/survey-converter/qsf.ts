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

export const ElementCodes = {
	SurveyFlow: "FL",
	SurveyBlock: "BL",
	SurveyOptions: "SO",
	SurveyQuestion: "SQ",	
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
export const isSurveyQuestion = (element: SurveyElement): element is SurveyQuestion =>
	element.Element === ElementCodes.SurveyQuestion;


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
//   "0": N03
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

export const isSurveyBlock = (element: SurveyElement): element is SurveyBlock =>
	element.Element === ElementCodes.SurveyBlock;

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
  SkipToDestination: string
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

export const isSurveyFlow = (element: SurveyElement): element is SurveyFlow =>
	element.Element === ElementCodes.SurveyFlow;

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

const writeQuestions = (
	flows: Flow[],
	questionsById: Map<QuestionId, SurveyQuestion>,
	blocksById: Map<BlockId, SurveyBlockPayloadEntry>,	
): SurveyQuestion[] => {
	return flows.map( flow => {
		if (flow.Type === "Standard" && flow.ID != null) {
			const block = blocksById.get(flow.ID);
			if (block == null) {
				console.warn(`Block with ID ${flow.ID} not found`);
				return [];
			}
			const questions = block.BlockElements
				.filter( element => element.Type === "Question")
				.map( element => {
					const question = element.QuestionID == null ? undefined : questionsById.get(element.QuestionID);
					if (question == null) {
						console.warn(`Question with ID ${element.QuestionID} not found`);
						return;
					}
					return question;
				})
				.filter( (question): question is SurveyQuestion => question != null);
			return questions;
		} else {
			const sf = flow.Flow;
			const subFlows = sf == null ? [] : Array.isArray(sf) ? sf : [sf];
			return writeQuestions(subFlows, questionsById, blocksById);
		}
	}).flat();
}

const parse = () => {
	const json = Deno.readTextFileSync("./src/survey-converter/loss.qsf");
	const surveyJson = JSON.parse(json) as SurveyRoot;
	const questions = surveyJson.SurveyElements.filter(isSurveyQuestion);
	const questionsById = new Map<QuestionId, SurveyQuestion>(
		questions.map((question) => [question.Payload.QuestionID, question])	
	);
	const blocks = surveyJson.SurveyElements.filter(isSurveyBlock);
	const blocksById = new Map(
		blocks.map((block) => 
			Object.values(block.Payload).map( element => [element.ID, element] as const)
		).flat()
	);
	const flows = surveyJson.SurveyElements.filter(isSurveyFlow);
	const flowPayloads = flows.map(flow => flow.Payload);
	const writtenQuestions = flowPayloads.map( flow => 
		writeQuestions([flow], questionsById, blocksById)
	);
	console.log(writtenQuestions);
	Deno.writeTextFileSync("./src/survey-converter/known.json",
		JSON.stringify({questions, blocks, flows}, null, "\t")
	);
}
parse();