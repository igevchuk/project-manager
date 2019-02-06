export type TextSegment = {
  id?: number;
  text: string;
  sequence: number;
  clauseId?: number;
};

export type TextVariant = {
  id?: number;
  title?: string;
  text?: string;
  sequence?: number;
  segmentId?: number;
};

export type IState = TextVariant[];