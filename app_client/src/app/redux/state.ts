export type uuid = number;

export type docTypes = docType[];
export type docType = { id: uuid; type?: string };

export type IState = {
  isLocal?: boolean;
  activeId: uuid;
  templates: template[];
};

export type template = {
  id?: uuid;
  name?: string;
  version?: string;
  versionIsPublished?: boolean;
  lastSaved?: Date;
  lastPublished?: Date;
  editIsLocked?: boolean;
  editLockedBy?: number;

  blocks: block[];
  paragraphs?: paragraph[];
  tables?: table[];
  tableRows?: tableRow[];
  tableCells?: tableCell[];
  tableParagraphs?: tableParagraph[];
  textSegments?: textSegment[];
  textVariants?: textVariant[];
  runs: run[];
  variables?: variable[];
  history?: history;
};

export type textSegment = {
  id?: uuid;
  ref?: {
    paragraphId?: uuid;
  };
  sequence?: number;
  type?: string; // TextSegment
  variantGroup?: number; // 1000
  variantType?: string; // Standard/Neutral
  variantIsDefault?: boolean;
  text?: string; // ARTICLE I
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

export type block = {
  id: uuid;
  sequence: uuid;
};

export type paragraph = {
  id: uuid;
  ref: {
    blockId: uuid;
  };
  type: string; // Paragraph
  properties: {
    pStyle: string; // Title
    jc: string; // center
    ind: number;
  };
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string; // 7006
};

export type table = {
  id?: uuid;
  ref?: {
    blockId?: uuid;
  };
  type?: string; // table
  props?: {
    'w:tblStyle': string; // TableGrid
    tblW: string; // 100% pct
  };
  columns: [
    {
      sequence: number;
      width: number; // 2880
    },
    {
      sequence: number;
      width: number;
    }
  ];
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string; // 7006
};

export type tableRow = {
  id?: uuid;
  ref?: {
    tableId?: uuid;
  };
  sequence?: number;
  type?: string; // TableRow
  props?: {
    height?: number;
  };
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string; // 7006
};

export type tableCell = {
  id?: uuid;
  ref?: {
    tableRowId?: uuid;
  };
  sequence?: number;
  type: string; // TableCell
  styling?: {
    width?: null;
    rowSpan?: null;
    colSpan?: null;
  };
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};
export type tableParagraph = {};

export type textVariant = {
  id?: uuid;
  title?: string;
  text?: string;
  sequence?: number;
  ref?: {
    segmentId?: uuid;
  };
};

export type run = {
  id?: uuid;
  ref: {
    textSegmentId?: uuid;
  };
  sequence: number;
  type?: string; // Run
  properties: {
    b?: null;
    i?: null;
    u?: null;
    strike?: null;
    vertAlign?: string; // subscript
  };
  t?: string; // ARTICLE I
  revision?: number;
  revisionCreatedDateTime?: Date; // 2019-01-01 14:00:05
  revisionCreatedBy?: string; // 7006
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

export type history = {
  blocks?: block[];
  tableRows?: tableRow[];
  tableCells?: tableCell[];
  tableParagraphs?: tableParagraph[];
  textSegments?: textSegment[];
  runs?: run;
};
