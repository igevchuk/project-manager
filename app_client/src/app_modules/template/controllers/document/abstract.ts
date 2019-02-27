export abstract class DocElement {
  public abstract accept(visit: IVisitor): void;
}

export interface IVisitor {
  visit(element: DocElement): void;
}

export interface IStrategy {
  execute(element: TemplateComponent): void;
}

type variantt = {
  id: number;
  ref?: {
    paragraphId?: number;
  };
  sequence?: number;
  type?: string;
  variantGroup?: number;
  variantType?: string;
  variantIsDefault?: boolean;
  text?: string;
  revision?: number;
  revisionCreatedDateTime?: Date;
  revisionCreatedBy?: string;
};

export type metadata = {
  isSegment: boolean;
  paragraph: {
    id?: string;
    blockId: number;
    blockSequence: number;
    type?: string;
    pStyle?: string;
  };
  segment: {
    id: string;
    blockId: number;
    paragraphId?: string;
    text: string;
    run?: {};
    pStyle?: string;
  };
  variant: {
    id: string;
    ref?: {
      paragraphId?: string;
    };
    sequence?: number;
    type?: string;
    variantGroup?: string;
    variantDescription?: string;
    variantIsDefault?: boolean;
    text?: string;
    revisionCreatedDateTime?: Date;
    revisionCreatedBy?: string;
    properties?: {};
  };
  ref?: {
    id?: number;
    blockId?: number;
    paragraphId?: number;
    text?: string;
    run?: [];
    pStyle?: string;
  };
  variants?: variantt[];
};

export abstract class TemplateComponent extends DocElement {
  public metadata: metadata;

  public constructor(metadata: metadata) {
    super();
    this.metadata = metadata;
  }

  public abstract add(c: TemplateComponent): void;
  public abstract remove(c: TemplateComponent): void;
  public abstract display(depth: number): void;
  public abstract getChildren(): TemplateComponent[];
  public accept(visitor: IVisitor): void {
    visitor.visit(this);
  }
}
