import * as React from 'react';
import { IStrategy, TemplateComponent } from './abstract';

class ArticleStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'ArticleVisitor';
  }
}

class SectionStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'SectionVisitor';
  }
}

class SubSectionStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'SubSectionVisitor';
  }
}

class ClauseStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'ClauseVisitor';
  }
}

class SubClauseStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'SubClauseVisitor';
  }
}

class TextSegmentStrategy implements IStrategy {
  public execute(element: TemplateComponent): void {
    element.metadata.segment.text = 'TextSegmentVisitor';
  }
}
