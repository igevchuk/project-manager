import * as React from 'react';
import { IVisitor, IStrategy, TemplateComponent } from './abstract';

export class BaseVisitor implements IVisitor {
  public strategy: IStrategy;

  // or constructor
  public setStrategy(strategy: IStrategy) {
    this.strategy = strategy;
  }

  public visit(element: TemplateComponent): void {
    this.strategy.execute(element);
  }
}

// strategy is opertional. if following concreate types used, no strategy needed.
export class ArticleVisitor extends BaseVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'ArticleVisitor';
  }
}

export class SectionVisitor extends BaseVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'SectionVisitor';
  }
}

export class SubSectionVisitor extends BaseVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'SubSectionVisitor';
  }
}

export class ClauseVisitor extends BaseVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'ClauseVisitor';
  }
}

export class SubClauseVisitor implements IVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'SubClauseVisitor';
  }
}

export class TextSegmentVisitor implements IVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'TextSegmentVisitor';
  }
}
