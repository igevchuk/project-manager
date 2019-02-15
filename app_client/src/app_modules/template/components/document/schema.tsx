import * as React from 'react';
import { DocElement, IVisitor } from './abstract';

import * as templateState from '../../../../app/redux/state';
import { EXITED } from 'react-transition-group/Transition';

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

    this.templateLeaves = this.getTemplateLeaves(this.template.textSegments);

    this.clauseComponents = this.clauses.map(paragraph => {
      const paragraphId = paragraph.id;

      const clauseTemplateLeaves = this.templateLeaves.filter(templateLeaf => {
        return templateLeaf.metadata.segment.paragraphId === paragraphId;
      });

      const blockASequence = this.getSequence(
        this.template.blocks,
        paragraph.ref.blockId
      );

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

    this.subSectionComponents = this.subSections.map(paragraph => {
      const paragraphId = paragraph.id;

      const subSectionTemplateLeaves = this.templateLeaves.filter(
        templateLeaf => {
          return templateLeaf.metadata.segment.paragraphId === paragraphId;
        }
      );

      const blockASequence = this.getSequence(
        this.template.blocks,
        paragraph.ref.blockId
      );

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

      const subSectionTemplateComposite = new TemplateComposite(metadata);
      subSectionTemplateLeaves.map(templateLeave => {
        subSectionTemplateComposite.Add(templateLeave);
      });
      return subSectionTemplateComposite;
    });

    this.sectionComponents = this.sections.map(paragraph => {
      const paragraphId = paragraph.id;

      const sectionTemplateLeaves = this.templateLeaves.filter(templateLeaf => {
        return templateLeaf.metadata.segment.paragraphId === paragraphId;
      });

      const blockASequence = this.getSequence(
        this.template.blocks,
        paragraph.ref.blockId
      );

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

      const sectionTemplateComposite = new TemplateComposite(metadata);
      sectionTemplateLeaves.map(templateLeave => {
        sectionTemplateComposite.Add(templateLeave);
      });
      return sectionTemplateComposite;
    });

    this.articleComponents = this.articles.map(paragraph => {
      const paragraphId = paragraph.id;

      const articleTemplateLeaves = this.templateLeaves.filter(templateLeaf => {
        return templateLeaf.metadata.segment.paragraphId === paragraphId;
      });

      const blockASequence = this.getSequence(
        this.template.blocks,
        paragraph.ref.blockId
      );

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

      const articleTemplateComposite = new TemplateComposite(metadata);
      articleTemplateLeaves.map(templateLeave => {
        articleTemplateComposite.Add(templateLeave);
      });
      return articleTemplateComposite;
    });

    this.articleComponents.sort((a, b) => {
      const blockASequence = a.metadata.paragraph.blockSequence;
      const blockBSequence = b.metadata.paragraph.blockSequence;
      return blockASequence - blockBSequence;
    });

    this.articleComponents.reverse();

    // ====
    for (const component of this.articleComponents) {
      const parentSequence = component.metadata.paragraph.blockSequence;

      if (!this.sectionComponents) {
        break;
      }

      const sectionComponents = this.sectionComponents.filter(component => {
        const blockSequence = component.metadata.paragraph.blockSequence;
        return blockSequence > parentSequence;
      });

      if (sectionComponents.length > 0) {
        for (const subcomponent of sectionComponents) {
          component.Add(subcomponent);
        }
      }
    }

    // ====
    for (const component of this.sectionComponents) {
      const parentSequence = component.metadata.paragraph.blockSequence;

      if (!this.subSectionComponents) {
        break;
      }

      const subSectionComponent = this.subSectionComponents.filter(
        component => {
          const blockSequence = component.metadata.paragraph.blockSequence;
          return blockSequence > parentSequence;
        }
      );

      if (subSectionComponent.length > 0) {
        for (const subcomponent of subSectionComponent) {
          component.Add(subcomponent);
        }
      }
    }

    // ====
    for (const component of this.subSectionComponents) {
      const parentSequence = component.metadata.paragraph.blockSequence;

      if (!this.clauseComponents) {
        break;
      }

      const clauseComponents = this.clauseComponents.filter(component => {
        const blockSequence = component.metadata.paragraph.blockSequence;
        return blockSequence > parentSequence;
      });

      if (clauseComponents.length > 0) {
        for (const subcomponent of clauseComponents) {
          component.Add(subcomponent);
        }
      }
    }

    // ====
    for (const component of this.clauseComponents) {
      const parentSequence = component.metadata.paragraph.blockSequence;

      if (!this.subClauseComponents) {
        break;
      }
      const subClauseComponents = this.subClauseComponents.filter(component => {
        const blockSequence = component.metadata.paragraph.blockSequence;
        return blockSequence > parentSequence;
      });

      if (subClauseComponents.length > 0) {
        for (const subcomponent of subClauseComponents) {
          component.Add(subcomponent);
        }
      }
    }

    console.log(this.articleComponents);
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
