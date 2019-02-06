export type IState = {
  activeId: number;
  templates?: template[];
};

export type template = {
  id?: number;
  name?: string;
  selectedType?: number;
  type?: type[];

  articles?: article[];
  sections?: section[];
  subSections?: subSection[];
  clauses?: clause[];
  subClauses?: subClause[];
  textSegments?: textSegment[];
  textVariant?: textVariant[];

  //
  // previous preperties, will be removed
  //
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
  ref?: { subClauseId?: number };
  decorator?: decorator;
};

export type textVariant = {
  id?: number;
  title?: string;
  text?: string;
  sequence?: number;
  ref: { segmentId: number, docLevel: number };
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
