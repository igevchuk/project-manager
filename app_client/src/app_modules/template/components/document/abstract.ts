export abstract class DocElement {
  public abstract accept(visit: IVisitor): void;
}

export interface IVisitor {
  visit(element: DocElement): void;
}
