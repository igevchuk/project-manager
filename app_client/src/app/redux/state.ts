// export type uuid = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
// import { v4 } from 'uuid';
export type uuid = number;

export type docTypes = docType[];
export type docType = { id: uuid; type?: string }; // such as Table, TableRow, TextSegment etc.

export type IState = {
  activeId: uuid;
  templates?: template[];
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

  contentOutline?: contentOutline; // new added
  blocks?: block[];
  paragraphs?: paragraph[];
  tables?: table[]; // new added
  tableRows?: tableRow[];
  tableCells?: tableCell[];
  tableParagraphs?: tableParagraph[];
  textSegments?: textSegment[];
  runs?: run[];
  variables?: variable[];
  history?: history;
};

// this is new added for easily operation in front-end.
// it also plays a role as a map, which provides support for tracking.
// the core is blockId. So, blocks entity even don't care the sequence
export type contentOutline = {
  id?: uuid;
  name?: string;
  articles: [{ id: uuid; blockId: uuid; sequence: number }];
  sections: [
    {
      id?: uuid;
      blockId?: uuid;
      sequence?: number;
      ref?: {
        articleId?: uuid;
      };
    }
  ];
  subSections: [
    {
      id?: uuid;
      blockId?: uuid;
      sequence?: number;
      ref?: {
        sectionId?: uuid;
      };
    }
  ];
  clauses?: [
    {
      id?: uuid;
      blockId?: uuid;
      sequence?: number;
      ref?: {
        subSectionId?: uuid;
      };
    }
  ];
  subClauses?: [
    {
      id?: uuid;
      blockId?: uuid;
      sequence?: number;
      ref?: {
        clauseId?: uuid;
      };
    }
  ];
  textSegments?: [
    {
      id?: uuid;
      blockId?: uuid;
      sequence?: number;
      ref?: {
        subClauseId?: uuid;
      };
    }
  ];
};

// moved out some specific properties to related entities,
// such as the paragraph for textSegment/table, and columns etc.
// the reason was following single responsibility principle.
// block should just be a box, a wrapper, and nothing else.
export type block = {
  id?: uuid;
  isActive?: boolean; // new added, only with backend, because block can be delete
  sequence?: number;

  // revision?: number;
  // revisionCreatedDateTime?: Date;
  // revisionCreatedBy?: string;
  //
  // removed the following properties definition
  //
  // sequence: number;
  // type: 'Paragraph';
  // properties: {
  //   pStyle: 'Heading4';
  // };
  // type: 'Table';
  // properties: {
  //   'w:tblStyle': 'TableGrid';
  //   tblW: '100% pct';
  // };
  // columns: [
  //   {
  //     sequence: 0;
  //     width: 2880;
  //   },
  //   {
  //     sequence: 1;
  //     width: 2880;
  //   }
  // ];
};

export type paragraph = {
  id: uuid;
  ref: {
    blockId: uuid;
  };
  type?: string; // Paragraph

  // will move to textSegment
  properties?: {
    pStyle: string; // Title
    jc: string; // center
    ind: number;
  };

  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string; // 7006
};

// new added table entity, and includes some entities moved from block
export type table = {
  id?: uuid;
  ref?: {
    blockId?: uuid;
  };
  // sequence?: number;
  type?: string; // table
  styling?: {
    // properties
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

// changed the refid
export type tableRow = {
  id?: uuid;
  ref?: {
    tableId?: uuid;
  };
  sequence?: number;
  type?: string; // TableRow
  styling?: {
    // properties
    height?: number;
  };
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string; // 7006
};

// changed the refid
export type tableCell = {
  id?: uuid;
  ref?: {
    tableRowId?: uuid;
  };
  sequence?: number;
  type: string; // TableCell
  styling?: {
    // properties
    width?: null;
    rowSpan?: null;
    colSpan?: null;
  };
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};
export type tableParagraph = {
  id?: uuid;
  ref?: {
    tableCellId: uuid;
  };
  sequence: number | null;
  type: string; // Paragraph
  properties: {
    pStyle: null;
    jc: null;
    ind: null;
  };
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

// changed the refid to block, and added new property existed in block.
export type textSegment = {
  id: uuid;
  ref: {
    paragraphId?: uuid;
  };
  styling?: {
    // properties
    pStyle?: string; // Title
    jc?: string; // center
  };
  sequence?: number;
  // type?: string; // TextSegment
  variantGroup?: number;
  variantType?: string; // Standard/Neutral
  variantIsDefault?: boolean;
  text?: string;
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

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
  ref?: {
    textSegmentId?: uuid;
  };
  sequence?: number;
  type?: string; // Run
  styling?: {
    b?: null;
    i?: null;
    u?: null;
    // strike?: null;
    // vertAlign?: string; // subscript
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
  id?: number;
  contentOutline?: contentOutline;
  blocks?: block[];
  tables?: table[];
  tableRows?: tableRow[];
  tableCells?: tableCell[];
  tableParagraphs?: tableParagraph[];
  textSegments?: textSegment[];
  runs?: run;
};
