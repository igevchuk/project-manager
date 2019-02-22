import * as React from 'react';
import { IStrategy, TemplateComponent } from './abstract';

export class ArticleStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'ArticleVisitor';
  }
}

export class SectionStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'SectionVisitor';
  }
}

export class SubSectionStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'SubSectionVisitor';
  }
}

export class ClauseStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'ClauseVisitor';
  }
}

export class SubClauseStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'SubClauseVisitor';
  }
}

export class TextSegmentStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'TextSegmentVisitor';
  }
}
