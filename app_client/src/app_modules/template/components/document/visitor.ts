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
class ArticleVisitor extends BaseVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'ArticleVisitor';
  }
}

class SectionVisitor extends BaseVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'SectionVisitor';
  }
}

class SubSectionVisitor extends BaseVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'SubSectionVisitor';
  }
}

class ClauseVisitor extends BaseVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'ClauseVisitor';
  }
}

class SubClauseVisitor implements IVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'SubClauseVisitor';
  }
}

class TextSegmentVisitor implements IVisitor {
  public visit(element: TemplateComponent): void {
    element.metadata.segment.text = 'TextSegmentVisitor';
  }
}
