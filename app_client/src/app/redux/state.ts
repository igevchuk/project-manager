export type uuid = string;

export type docTypes = docType[];
export type docType = { id: uuid; type?: string };

export type renderBlock = {
  order: number;
  paragraph: paragraph;
  segments: [
    {
      runs: run[];
      segment: textSegment;
    }
  ];
};

export type IState = {
  isLocal?: boolean;
  activeSegId: uuid;
  template: template;
  renderBlocks?: renderBlock[];
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
  paragraphs: paragraph[];
  tables?: table[];
  tableRows?: tableRow[];
  tableCells?: tableCell[];
  textSegments: textSegment[];
  runs: run[];
  variables?: variable[];
  history?: history;

  // will be removed
  textVariants?: textVariant[];
};

export type textSegment = {
  id: uuid;
  ref: {
    paragraphId: uuid;
  };
  sequence: number;
  // type: string; // TextSegment
  variantGroup: uuid; // 1000
  variantDescription?: string;
  variantIsDefault: boolean;
  text?: string; // ARTICLE I
  // revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
  properties?: {};
};

export type block = {
  id: number;
  sequence: number;
};

export type paragraph = {
  id: uuid;
  ref: {
    blockId: number;
  };
  type: string; // Paragraph
  properties: {
    pStyle: string; // Title
    jc?: string; // center
    ind?: number;
  };
  // revision?: number;
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
  // revision?: number;
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
  // revision?: number;
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
  // revision?: number;
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
  id: uuid;
  ref: {
    textSegmentId?: uuid;
  };
  sequence: number;
  type?: string; // Run
  properties: {
    b?: boolean;
    i?: boolean;
    u?: boolean;
    strike?: boolean;
    vertAlign?: string; // subscript
  };
  t: string; // ARTICLE I
  // revision?: number;
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
  // revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

export type history = {
  blocks: block[];
  paragraphs?: paragraph[];
  tables?: table[];
  tableRows?: tableRow[];
  tableCells?: tableCell[];
  textSegments?: textSegment[];
  runs: run[];
  // variables?: variable[];
  // history?: history;
};
