export type Segment = {
  id?: number;
  text: string;
  sequence: number;
  clauseId?: number;
};

export type Variant = {
  id?: number;
  title?: string;
  text?: string;
  sequence?: number;
  segmentId?: number;
};

export type IState = Variant[];