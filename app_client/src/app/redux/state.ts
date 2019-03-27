export type uuid = string;

export type docTypes = docType[];
export type docType = { id: uuid; type?: string };

export type segmentSource = {
  runs: run[];
  segment: textSegment;
};

export type renderBlock = {
  id: string;
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
  isLocal: boolean;
  activeSegId: uuid;
  template: template;
  renderBlocks: renderBlock[];
  variants: segmentSource[][];
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
  // textVariants?: textVariant[];
};

export type textSegment = {
  id: uuid;
  type?: string; // TextSegment
  properties?: {};
  sequence: number;
  ref: {
    paragraphId: uuid;
  };
  variantGroup: uuid; // 1000
  variantDescription: string;
  variantIsDefault: boolean;
  text: string; // ARTICLE I
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

export type block = {
  id: number;
  sequence: number;
};

export type paragraph = {
  id: uuid;
  type: string; // Paragraph
  properties: {
    pStyle: string;
    jc?: string; // center
    ind?: number;
  };
  sequence?: number; // new added
  ref: {
    blockId: number;
  };

  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: number; // new changing string; 7006
};

export type table = {
  id?: uuid;
  ref?: {
    blockId?: uuid;
  };
  type?: string; // table
  props?: {
    tblStyle?: string; // TableGrid
    tblW?: string; // 100% pct
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

export type run = {
  id: uuid;
  type?: string; // Run
  properties?: {
    b?: boolean;
    i?: boolean;
    u?: boolean;
    strike?: boolean;
    vertAlign?: string; // subscript
  };
  sequence: number;
  ref: {
    textSegmentId: uuid;
  };

  revisionCreatedDateTime?: Date; // 2019-01-01 14:00:05
  revisionCreatedBy?: string; // 7006
  isVariable?: false; // new added
  t: string; // ARTICLE I
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
