export type IState = {
  activeId: number;
  templates?: template[];
};

export type template = {
  id?: number;
  name?: string;
  textLevel?: textLevel;

  article?: article[];
  section?: section[];
  subSection?: subSection[];
  clause?: clause[];
  subClause?: subClause[];
  textSegment?: textSegment[];

  //
  // previous preperties, will be removed
  //
  approval_required?: boolean;
  checked_out?: string;
  created?: string;
  creator?: string;
  creatoremail?: string;
  creatorid?: number;
  last_decision?: string;
  published?: string;
  publisher?: string;
  updated?: string;
  updater?: string;
  updateremail?: string;
  updaterid?: number;
  value?: string;
  variants?: template_variant[];
};

export type article = {
  id?: number;
  type?: textLevelBase;
  title?: string;
  decorator?: decorator;
};
export type section = {
  id?: number;
  type?: textLevelBase;
  title?: string;
  ref?: ref;
  decorator?: decorator;
};
export type subSection = {
  id?: number;
  type?: textLevelBase;
  title?: string;
  ref?: ref;
  decorator?: decorator;
};
export type clause = {
  id?: number;
  type?: textLevelBase;
  title?: string;
  ref?: ref;
  decorator?: decorator;
};
export type subClause = {
  id?: number;
  type?: textLevelBase;
  title?: string;
  ref?: ref;
  decorator?: decorator;
};
export type textSegment = {
  id?: number;
  type?: textLevelBase;
  content?: string;
  ref?: ref;
  decorator?: decorator;
};

export type decorator = {
  bold?: boolean;
  italic?: boolean;
  style?: {};
  // ....
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
