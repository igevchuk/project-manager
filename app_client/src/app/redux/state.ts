export type IState = {
  activeId: number;
  templates?: template[];
};

export type template = {
  id?: number;
  name?: string;
  version?: string;

  blocks?: block[];
  paragraphs?: paragraph[];
  tables?: table[];

  textSegments?: textSegment[];
  textVariants?: textVariant[];

  //
  // previous preperties, will be removed
  //
  selectedType?: number;
  type?: type[];
  articles?: article[];
  sections?: section[];
  subSections?: subSection[];
  clauses?: clause[];
  subClauses?: subClause[];
  // approval_required?: boolean;
  // checked_out?: string;
  // created?: string;
  // creator?: string;
  // creatoremail?: string;
  // creatorid?: number;
  // last_decision?: string;
  // published?: string;
  // publisher?: string;
  // updated?: string;
  // updater?: string;
  // updateremail?: string;
  // updaterid?: number;
  // value?: string;
  // variants?: template_variant[];
};

export type block = {
  id?: number;
  position?: number;
};

export type paragraph = {
  id?: number;
  type: string;
  ref?: { blockId?: number };
};

export type table = {
  id?: number;
  ref?: { blockId?: number };
};

export type type = {
  id?: number;
  model?: string[];
};

export type article = {
  id?: number;
  name?: string;
  ref?: { templateId?: number };
};

export type section = {
  id?: number;
  name?: string;
  ref?: { articleId?: number };
};

export type subSection = {
  id?: number;
  name?: string;
  ref?: { sectionId?: number };
};

export type clause = {
  id?: number;
  name?: string;
  ref?: { subSectionId?: number };
};

export type subClause = {
  id?: number;
  name?: string;
  ref?: { clauseId?: number };
};

export type textSegment = {
  id?: number;
  sequence?: number;
  segment?: string;
  ref?: { subClauseId?: number; paragraphId?: number };
  decorator?: decorator;
  playbookRules?: playbookRule[];
};

/*
  properties "accept", "escalate", "modify" and "reject" depend on playbook rule type and are hardcoded
*/
export type playbookRule = {
  id?: number;
  accept: boolean; 
  confirmedLanguage?: string;
  escalate: boolean;
  language: string;
  modify: boolean;
  reject: boolean;
  type: string;
  ref?: { textSegmentId?: number }; // if playbook rule belongs to the text segment, otherwise paragraphId
};

export type textVariant = {
  id?: number;
  title?: string;
  text?: string;
  sequence?: number;
  ref: { paragraphId?: number };
};

export type decorator = {
  bold?: boolean;
  italic?: boolean;
  style?: {};
  // .... validate
};

export type ref = {
  articleId?: number;
  sectionId?: number;
  subSectionId?: number;
  clauseId?: number;
  subClauseId?: number;
};

export type textLevel = textLevelBase | textLevelTwo | textLevelThree;

export enum textLevelBase {
  article1,
  section,
  subSection,
  clause,
  subClause,
  textSegment
}

export enum textLevelTwo {
  article1,
  title,
  section,
  subSection,
  clause,
  textSegment
}

export enum textLevelThree {
  section1,
  article,
  section,
  subSection,
  clause,
  textSegment
}

export type template_variant = {
  description?: string;
  id?: number;
  name?: string;
};
