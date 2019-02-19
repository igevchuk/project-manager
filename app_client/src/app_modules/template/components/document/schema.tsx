import * as React from 'react';
import { metadata, TemplateComponent } from './abstract';
import * as visitor from './visitor';

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
  runs: templateState.run[];
};

type paragraph = templateState.paragraph;

export class TemplateComposite extends TemplateComponent {
  private children: TemplateComponent[] = new Array();

  public constructor(metadata: metadata) {
    super(metadata);
  }

  public add(component: TemplateComponent): void {
    this.children.push(component);
  }

  public remove(component: TemplateComponent): void {
    this.children.pop();
  }

  public getChildren(): TemplateComponent[] {
    return this.children;
  }
  public display(depth: number): void {
    // console.log(`- ${depth}` + this.children.length);

    this.children.forEach(component => {
      // const articleVisitor = new visitor.ArticleVisitor();
      // this.accept(articleVisitor);
      component.display(depth + 2);
    });
  }
}

export class TemplateLeaf extends TemplateComponent {
  public constructor(metadata: metadata) {
    super(metadata);
  }
  public add(c: TemplateComponent): void {
    console.log('Cannot add to a leaf ????');
  }
  public remove(c: TemplateComponent): void {
    console.log('Cannot remove from a leaf');
  }

  public getChildren(): TemplateComponent[] {
    return [];
  }

  public display(depth: number): void {
    // console.log(this.metadata.segment.text);
    // console.log(`- ${depth}` + this.metadata.segment.text);

    switch (depth) {
      case 2:
        // console.log(this.metadata.segment.text);
        const articleVisitor = new visitor.ArticleVisitor();
        this.accept(articleVisitor);
        // console.log(this.metadata.segment.text);
        break;
      case 4:
        break;
      case 6:
        break;
      case 8:
        break;
      case 10:
        break;
      default:
        break;
    }
  }
}

export const aa = props => {
  return <div>this is tesitng</div>;
};

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

  public initTemplate() {
    this.templateLeaves = this.generateTemplateLeaves(
      this.template.textSegments
    );

    this.clauseComponents = this.generateComposites(this.clauses);
    this.subSectionComponents = this.generateComposites(this.subSections);
    this.sectionComponents = this.generateComposites(this.sections);
    this.articleComponents = this.generateComposites(this.articles);

    this.articleComponents.sort((a, b) => {
      const blockASequence = a.metadata.paragraph.blockSequence;
      const blockBSequence = b.metadata.paragraph.blockSequence;
      return blockASequence - blockBSequence;
    });

    this.articleComponents.reverse();

    // embedding sectionComponents into articleComponents
    this.chainingChildren(this.articleComponents, this.sectionComponents);
    // embedding subSectionComponents into sectionComponents
    this.chainingChildren(this.sectionComponents, this.subSectionComponents);
    // embedding clauseComponents into subSectionComponents
    this.chainingChildren(this.subSectionComponents, this.clauseComponents);
    // embedding subClauseComponents into clauseComponents
    this.chainingChildren(this.clauseComponents, this.subClauseComponents);
    // console.log(this.articleComponents);

    // this.articleComponents.reverse();
  }

  public getArticleComponents() {
    return this.articleComponents;
  }

  public chainingChildren(
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
          component.add(subcomponent);
        }
      }
    }
  }

  public generateComposites(elements: paragraph[]) {
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
        segment: {
          id: -1,
          text: ''
        }
      };

      const clauseTemplateComposite = new TemplateComposite(metadata);
      clauseTemplateLeaves.map(templateLeave => {
        clauseTemplateComposite.add(templateLeave);
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

  public generateTemplateLeaves(
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
        const segmentRun = this.template.runs.filter(
          run => run.ref.textSegmentId === textSegment.id
        )[0];
        const segmentStyling =
          segmentRun && segmentRun.properties ? segmentRun.properties : {};

        const metadata = {
          isSegment: true,
          paragraph: {
            blockId: -1,
            blockSequence: -1
          },
          segment: {
            id: textSegment.id,
            paragraphId: textSegment.ref.paragraphId,
            text: textSegment.text,
            run: segmentStyling
          }
        };

        return new TemplateLeaf(metadata);
      }
    );
  }
}

export default Schema;
