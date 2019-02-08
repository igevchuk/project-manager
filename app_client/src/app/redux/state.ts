export type IState = {
  activeId: number;
  templates?: template[];
};

export type template = {
  id?: number;
  name?: string;
  version?: string;
  versionIsPublished?: boolean;
  lastSaved?: Date;
  lastPublished?: Date;
  editIsLocked?: boolean;
  editLockedBy?: number;

  blocks?: block[];
  tableRows?: tableRow[];
  tableCells?: tableCell[];
  tableParagraphs?: tableParagraph[];
  textSegments?: textSegment[];
  runs?: run[];
  variables?: variable[];
  history?: history;
};

export type history = {
  blocks?: block[];
  tableRows?: tableRow[];
  tableCells?: tableCell[];
  tableParagraphs?: tableParagraph[];
  textSegments?: textSegment[];
  runs?: run;
};

export type block = {
  id?: number;
  sequence?: number;
  type?: string;
  properties?: {
    pStyle?: string;
    jc?: string;
    // 'w:tblStyle'?: string;
    // tblW?: string;
  };
  columns?: [
    {
      sequence?: number;
      width?: number;
    },
    {
      sequence?: number;
      width?: number;
    }
  ];
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

export type tableRow = {
  id?: number;
  ref?: {
    tables?: number;
  };
  sequence?: number;
  type?: string; // TableRow
  properties?: {
    height?: number;
  };
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string; // 7006
};
export type tableCell = {
  id?: number;
  ref?: {
    tableRows?: number;
  };
  sequence?: number;
  properties?: {
    width?: null;
    rowSpan?: null;
    colSpan?: null;
  };
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};
export type tableParagraph = {
  id?: number;
  sequence?: null;
  type?: string; // Paragraph
  properties?: {
    pStyle?: null;
  };
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

export type textSegment = {
  id?: number;
  ref?: {
    paragraphs?: number;
  };
  sequence?: number;
  type?: string; // TextSegment
  variantGroup?: number;
  variantType?: string; // Standard/Neutral
  variantIsDefault?: boolean;
  text?: string;
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

export type run = {
  id?: number;
  ref?: {
    textSegments?: number;
  };
  sequence?: number;
  type?: string; // Run
  properties?: {
    b?: null;
    i?: null;
    u?: null;
  };
  t?: string;
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

export type variable = {
  id?: number;
  type?: string; // String
  placeholder?: string; // {{FirstName}}
  description?: string;
  isGlobal?: boolean;
  variableGroupId?: number;
  variableGroupName?: string;
  groupType?: string;
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};
