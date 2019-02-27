import * as React from 'react';
import { metadata, TemplateComponent } from './abstract';
import * as visitor from './visitor';

import * as templateState from '../../../../app/redux/state';

type ITemplate = {
  id?: string;
  name?: string;
  version?: string;
  versionIsPublished?: boolean;
  lastSaved?: Date;
  lastPublished?: Date;
  editIsLocked?: boolean;
  editLockedBy?: number;

  blocks: templateState.block[];
  paragraphs: templateState.paragraph[];
  tables?: templateState.table[];
  tableRows?: templateState.tableRow[];
  tableCells?: templateState.tableCell[];
  textSegments: templateState.textSegment[];
  runs: templateState.run[];
  variables?: templateState.variable[];
  history?: templateState.history;
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
    this.children.forEach(component => {
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
    switch (depth) {
      case 2:
        const articleVisitor = new visitor.ArticleVisitor();
        this.accept(articleVisitor);
        break;
      case 4:
        const ectionVisitor = new visitor.SectionVisitor();
        this.accept(ectionVisitor);
        break;
      case 6:
        const subSectionVisitor = new visitor.SubSectionVisitor();
        this.accept(subSectionVisitor);
        break;
      case 8:
        const clauseVisitor = new visitor.ClauseVisitor();
        this.accept(clauseVisitor);
        break;
      default:
        break;
    }
  }
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
      return paragraph.properties.pStyle === 'Title';
    });

    this.sections = this.template.paragraphs.filter(paragraph => {
      return paragraph.properties.pStyle === 'Heading 1';
    });
    this.subSections = this.template.paragraphs.filter(paragraph => {
      return paragraph.properties.pStyle === 'Heading 2';
    });
    this.clauses = this.template.paragraphs.filter(paragraph => {
      return paragraph.properties.pStyle === 'Heading 3';
    });
    this.subClauses = this.template.paragraphs.filter(paragraph => {
      return paragraph.properties.pStyle === 'Heading 4';
    });
  }

  public generateNav() {
    //
  }

  public getSortedBlocks() {
    this.template.blocks.sort((a, b) => {
      const blockASequence = a.sequence;
      const blockBSequence = b.sequence;

      return blockASequence - blockBSequence;
    });
  }

  public initTemplate2() {
    console.log(this.articles);

    this.templateLeaves = this.generateTemplateLeaves(
      this.template.textSegments,
      this.template.runs
    );

    this.clauseComponents = this.generateComposites(this.clauses);
    this.subSectionComponents = this.generateComposites(this.subSections);
    this.sectionComponents = this.generateComposites(this.sections);
    this.articleComponents = this.generateComposites(this.articles);

    // console.log(this.articleComponents);

    this.articleComponents.sort((a, b) => {
      const blockASequence = a.metadata.paragraph.blockSequence;
      const blockBSequence = b.metadata.paragraph.blockSequence;
      return blockASequence - blockBSequence;
    });

    // this.articleComponents.reverse();
    // console.log(this.articleComponents);

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

  public initTemplate() {
    this.getSortedBlocks();
    const blocks = this.template.blocks;
    console.log(blocks);

    const paragraphs = blocks.map(block => {
      const blockId = block.id;

      const paragraph = this.template.paragraphs.filter(paragraph => {
        return paragraph.ref.blockId === blockId;
      })[0];
      return paragraph;
    });

    console.log(paragraphs);

    const textSegments = paragraphs.map(paragraph => {
      const paragraphId = paragraph.id;

      const subTextSegments = this.template.textSegments.filter(segment => {
        return segment.ref.paragraphId === paragraphId;
      });
      return subTextSegments;
    });

    console.log(textSegments);

    debugger;

    this.templateLeaves = this.generateTemplateLeaves(
      this.template.textSegments,
      this.template.runs
    );

    // console.log(this.templateLeaves);

    this.clauseComponents = this.generateComposites(this.clauses);
    this.subSectionComponents = this.generateComposites(this.subSections);
    this.sectionComponents = this.generateComposites(this.sections);
    this.articleComponents = this.generateComposites(this.articles);

    console.log(this.articleComponents);

    this.articleComponents.sort((a, b) => {
      const blockASequence = a.metadata.paragraph.blockSequence;
      const blockBSequence = b.metadata.paragraph.blockSequence;
      // console.log(blockASequence, blockBSequence);

      return blockASequence - blockBSequence;
    });

    // this.articleComponents.reverse();
    // console.log(this.articleComponents);

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

      const filterTemplateLeaves = templateLeaves.filter(templateLeaf => {
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
          id: '',
          blockId: -1,
          text: ''
        },
        variant: {
          id: ''
        },
        ref: {},
        variants: []
      };

      const templateComposite = new TemplateComposite(metadata);
      filterTemplateLeaves.map(templateLeave => {
        templateComposite.add(templateLeave);
      });
      return templateComposite;
    });
  }

  public getSequence<Array>(
    blocks: templateState.block[],
    blockId: number
  ): number {
    return blocks.filter(block => block.id === blockId)[0].sequence;
  }

  public getBlockIdAndPStyule(
    paragraphs: templateState.paragraph[],
    paragraphId: string
  ): any {
    const paragraph = paragraphs.filter(
      paragraph => paragraph.id === paragraphId
    )[0];

    return {
      blockId: paragraph.ref.blockId,
      pStyle: paragraph.properties.pStyle
    };
  }

  public generateTemplateLeaves(
    textSegments: templateState.textSegment[],
    runs: templateState.run[]
  ): TemplateLeaf[] {
    return textSegments.map(
      (textSegment: {
        id: string;
        ref: {
          paragraphId: string;
        };
        sequence: number;
        type: string;
        variantGroup: string;
        variantDescription: string;
        variantIsDefault: boolean;
        text: string;
      }) => {
        const sortedRun = this.template.runs
          .filter(run => run.ref.textSegmentId === textSegment.id)
          .sort((a, b) => {
            const sequenceA = a.sequence;
            const sequenceB = b.sequence;
            return sequenceA - sequenceB;
          });

        // console.log(sortedRun);

        const extractRun = sortedRun.map(run => {
          return {
            runId: run.id,
            segmentId: run.ref.textSegmentId,
            properties: run.properties,
            t: run.t
          };
        });

        // console.log(extractRun);

        const blockIdAndPStyule = this.getBlockIdAndPStyule(
          this.template.paragraphs,
          textSegment.ref.paragraphId
        );

        const metadata = {
          isSegment: true,
          paragraph: {
            blockId: -1,
            blockSequence: -1
          },
          segment: {
            id: textSegment.id,
            blockId: blockIdAndPStyule.blockId,
            paragraphId: textSegment.ref.paragraphId,
            text: textSegment.text,
            runs: extractRun,
            pStyle: blockIdAndPStyule.pStyle
          },
          variant: textSegment,
          ref: {},
          variants: []
        };

        return new TemplateLeaf(metadata);
      }
    );
  }
}

export default Schema;
