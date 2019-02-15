import * as React from 'react';
import { DocElement, IVisitor } from './abstract';

class ArticleVisitor implements IVisitor {
  public visit(element: DocElement): void {
    return;
  }
}

class SectionVisitor implements IVisitor {
  public visit(element: DocElement): void {
    return;
  }
}

class SubSectionVisitor implements IVisitor {
  public visit(element: DocElement): void {
    return;
  }
}

class ClauseVisitor implements IVisitor {
  public visit(element: DocElement): void {
    return;
  }
}

class SubClauseVisitor implements IVisitor {
  public visit(element: DocElement): void {
    return;
  }
}

class TextSegmentVisitor implements IVisitor {
  public visit(element: DocElement): void {
    return;
  }
}
