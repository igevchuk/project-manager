import * as React from 'react';
import { DocElement, IVisitor } from './abstract';

import * as templateState from '../../../../app/redux/state';

type ITemplate = {
  id?: number;
  name?: string;
  version?: string;
  lastSaved?: Date;
  lastPublished?: Date;
  blocks: templateState.block[];
  paragraphs: templateState.paragraph[];
  textSegments: templateState.textSegment[];
};

type paragraph = templateState.paragraph;

type metadata = {
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
    this.children.forEach(component => {
      component.accept(visit);
    });
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

  // public accept(visit: IVisitor): void {
  //   this.children.forEach(component => {
  //     component.accept(visit);
  //   });
  // }
}

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
  }

  public initializeTemplate() {
    this.templateLeaves = this.getTemplateLeaves(this.template.textSegments);

    this.clauseComponents = this.getComponents(this.clauses);
    this.subSectionComponents = this.getComponents(this.subSections);
    this.sectionComponents = this.getComponents(this.sections);
    this.articleComponents = this.getComponents(this.articles);

    this.articleComponents.sort((a, b) => {
      const blockASequence = a.metadata.paragraph.blockSequence;
      const blockBSequence = b.metadata.paragraph.blockSequence;
      return blockASequence - blockBSequence;
    });

    this.articleComponents.reverse();

    // embedding sectionComponents into articleComponents
    this.embeddingChildren(this.articleComponents, this.sectionComponents);
    // embedding subSectionComponents into sectionComponents
    this.embeddingChildren(this.sectionComponents, this.subSectionComponents);
    // embedding clauseComponents into subSectionComponents
    this.embeddingChildren(this.subSectionComponents, this.clauseComponents);
    // embedding subClauseComponents into clauseComponents
    this.embeddingChildren(this.clauseComponents, this.subClauseComponents);
    console.log(this.articleComponents);
  }

  public embeddingChildren(
    parentComponent: TemplateComponent[],
    childComponent: TemplateComponent[]
  ) {
    for (const component of parentComponent) {
      const parentSequence = component.metadata.paragraph.blockSequence;

      if (!childComponent) {
        break;
      }

      const chilComponent = childComponent.filter(component => {
        const blockSequence = component.metadata.paragraph.blockSequence;
        return blockSequence > parentSequence;
      });

      if (chilComponent.length > 0) {
        for (const subcomponent of chilComponent) {
          component.Add(subcomponent);
        }
      }
    }
  }

  public getComponents(elements: paragraph[]) {
    const templateLeaves = this.templateLeaves;
    const blocks = this.template.blocks;

    return elements.map(paragraph => {
      const paragraphId = paragraph.id;

      const clauseTemplateLeaves = templateLeaves.filter(templateLeaf => {
        return templateLeaf.metadata.segment.paragraphId === paragraphId;
      });

      const blockASequence = this.getSequence(blocks, paragraph.ref.blockId);

      const metadata = {
        isSegment: false,
        paragraph: {
          id: paragraph.id,
          blockId: paragraph.ref.blockId,
          blockSequence: blockASequence,
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
  }

  public getSequence<Array>(
    blocks: templateState.block[],
    blockId: number
  ): number {
    return blocks.filter(block => block.id === blockId)[0].sequence;
  }

  public getTemplateLeaves(
    textSegments: templateState.textSegment[]
  ): TemplateLeaf[] {
    return textSegments.map(
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
          paragraph: {
            blockId: -1,
            blockSequence: -1
          },
          segment: {
            id: textSegment.id,
            paragraphId: textSegment.ref.paragraphId,
            text: textSegment.text
          }
        };

        return new TemplateLeaf(metadata);
      }
    );
  }
}

export default Schema;
