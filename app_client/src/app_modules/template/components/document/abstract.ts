export abstract class DocElement {
  public abstract accept(visit: IVisitor): void;
}

export interface IVisitor {
  visit(element: DocElement): void;
}

export interface IStrategy {
  execute(element: TemplateComponent): void;
}

export type metadata = {
  isSegment: boolean;
  paragraph: {
    id?: number;
    blockId: number;
    blockSequence: number;
    type?: string;
    pStyle?: string;
  };
  segment: {
    id?: number;
    paragraphId?: number;
    text?: string;
  };
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
  public accept(visitor: IVisitor): void {
    visitor.visit(this);
  }
}
