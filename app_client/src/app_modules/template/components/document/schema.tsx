import * as React from 'react';
// import React, { useState } from 'react';
import { DocElement, IVisitor } from './abstract';

import * as templateState from '../../../../app/redux/state';

type segment = {
  id: number;
  paragraphId: number;
  text: string;
};

type metadata = {
  isSegment: boolean;
  paragraph: {
    id?: number;
    blockId?: number;
    type?: string;
    pStyle?: string;
  };
  segment: {
    id?: number;
    paragraphId?: number;
    text?: string;
  };
};

abstract class TemplateComponent extends DocElement {
  public metadata: metadata;
  public constructor(metadata: metadata) {
    super();
    this.metadata = metadata;
  }

  public abstract Add(c: TemplateComponent): void;
  public abstract Remove(c: TemplateComponent): void;
  public abstract Display(depth: number): void;
  public abstract accept(visit: IVisitor): void;
}

class TemplateComposite extends TemplateComponent {
  private children: TemplateComponent[] = new Array();

  public constructor(metadata: metadata) {
    super(metadata);
  }

  public Add(component: TemplateComponent): void {
    this.children.push(component);
  }

  public Remove(component: TemplateComponent): void {
    this.children.pop();
  }

  public Display(depth: number): void {
    // Console.WriteLine(new String('-', depth) + name);
    console.log(`- ${depth}` + this.metadata.isSegment);
    // Recursively display child nodes
    this.children.forEach(component => {
      component.Display(depth + 2);
    });
  }

  public accept(visit: IVisitor): void {
    return;
  }
}

class TemplateLeaf extends TemplateComponent {
  public constructor(metadata: metadata) {
    super(metadata);
  }
  public Add(c: TemplateComponent): void {
    console.log('Cannot add to a leaf ????');
  }
  public Remove(c: TemplateComponent): void {
    console.log('Cannot remove from a leaf');
  }
  public Display(depth: number): void {
    // console.log(new String('-', depth) + name);
    console.log(`- ${depth}` + this.metadata.isSegment);
  }

  public accept(visit: IVisitor): void {
    return;
  }
}

type ITemplate = {
  id: number;
  name: string;
  version?: string;
  lastSaved?: Date;
  lastPublished?: Date;
  blocks: templateState.block[];
  paragraphs: templateState.paragraph[];
  textSegments: templateState.textSegment[];
  // tables: templateState.table[];
};
type paragraph = templateState.paragraph;

class Schema {
  public articles: paragraph[] = new Array<paragraph>();
  public sections: paragraph[] = new Array<paragraph>();
  public subSections: paragraph[] = new Array<paragraph>();
  public clauses: paragraph[] = new Array<paragraph>();
  public subClauses: paragraph[] = new Array<paragraph>();

  public articleComponents: TemplateComponent[];
  public sectionComponents: TemplateComponent[];
  public subSectionComponents: TemplateComponent[];
  public clauseComponents: TemplateComponent[];
  public subClauseComponents: TemplateComponent[];
  public templateLeaves: TemplateLeaf[];

  public constructor(public template: ITemplate) {
    this.articles = this.template.paragraphs.filter(paragraph => {
      return paragraph.properties.pStyle === 'Heading1';
    });

    this.sections = this.template.paragraphs.filter(paragraph => {
      return paragraph.properties.pStyle === 'Heading2';
    });

    this.subSections = this.template.paragraphs.filter(paragraph => {
      return paragraph.properties.pStyle === 'Heading3';
    });

    this.clauses = this.template.paragraphs.filter(paragraph => {
      return paragraph.properties.pStyle === 'Heading4';
    });

    this.subClauses = this.template.paragraphs.filter(paragraph => {
      return paragraph.properties.pStyle === 'Heading5';
    });

    this.templateLeaves = this.template.textSegments.map(
      (textSegment: {
        id: number;
        ref: {
          paragraphId: number;
        };
        sequence: number;
        type: string;
        variantGroup: number;
        variantType: string;
        variantIsDefault: boolean;
        text: string;
      }) => {
        const metadata = {
          isSegment: true,
          paragraph: {},
          segment: {
            id: textSegment.id,
            paragraphId: textSegment.ref.paragraphId,
            text: textSegment.text
          }
        };

        return new TemplateLeaf(metadata);
      }
    );

    this.clauseComponents = this.clauses.map(paragraph => {
      const paragraphId = paragraph.id;

      const clauseTemplateLeaves = this.templateLeaves.filter(templateLeaf => {
        return templateLeaf.metadata.segment.paragraphId === paragraphId;
      });

      const metadata = {
        isSegment: false,
        paragraph: {
          id: paragraph.id,
          blockId: paragraph.ref.block,
          type: paragraph.type,
          pStyle: paragraph.properties.pStyle
        },
        segment: {}
      };

      const clauseTemplateComposite = new TemplateComposite(metadata);
      clauseTemplateLeaves.map(templateLeave => {
        clauseTemplateComposite.Add(templateLeave);
      });
      return clauseTemplateComposite;
    });
    // console.log(this.clauseComponents);

    this.subSectionComponents = this.subSections.map(paragraph => {
      const paragraphId = paragraph.id;

      const subSectionTemplateLeaves = this.templateLeaves.filter(
        templateLeaf => {
          return templateLeaf.metadata.segment.paragraphId === paragraphId;
        }
      );

      const metadata = {
        isSegment: false,
        paragraph: {
          id: paragraph.id,
          blockId: paragraph.ref.block,
          type: paragraph.type,
          pStyle: paragraph.properties.pStyle
        },
        segment: {}
      };

      const subSectionTemplateComposite = new TemplateComposite(metadata);
      subSectionTemplateLeaves.map(templateLeave => {
        subSectionTemplateComposite.Add(templateLeave);
      });
      return subSectionTemplateComposite;
    });
    // console.log(this.subSectionComponents);

    this.sectionComponents = this.sections.map(paragraph => {
      const paragraphId = paragraph.id;

      const sectionTemplateLeaves = this.templateLeaves.filter(templateLeaf => {
        return templateLeaf.metadata.segment.paragraphId === paragraphId;
      });

      const metadata = {
        isSegment: false,
        paragraph: {
          id: paragraph.id,
          blockId: paragraph.ref.block,
          type: paragraph.type,
          pStyle: paragraph.properties.pStyle
        },
        segment: {}
      };

      const sectionTemplateComposite = new TemplateComposite(metadata);
      sectionTemplateLeaves.map(templateLeave => {
        sectionTemplateComposite.Add(templateLeave);
      });
      return sectionTemplateComposite;
    });
    // console.log(this.sectionComponents);

    this.articleComponents = this.articles.map(paragraph => {
      const paragraphId = paragraph.id;

      const articleTemplateLeaves = this.templateLeaves.filter(templateLeaf => {
        return templateLeaf.metadata.segment.paragraphId === paragraphId;
      });

      const metadata = {
        isSegment: false,
        paragraph: {
          id: paragraph.id,
          blockId: paragraph.ref.block,
          type: paragraph.type,
          pStyle: paragraph.properties.pStyle
        },
        segment: {}
      };

      const articleTemplateComposite = new TemplateComposite(metadata);
      articleTemplateLeaves.map(templateLeave => {
        articleTemplateComposite.Add(templateLeave);
      });
      return articleTemplateComposite;
    });
    console.log(this.articleComponents);
  }
}

export default Schema;
