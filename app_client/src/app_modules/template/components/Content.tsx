import * as React from 'react';

import { Grid, Icon } from 'semantic-ui-react';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Variants from './Variants';
import {
  StyledDocument,
  TextHover,
  TextHoverFeature,
  TextNode,
  VariantCount
} from './Document.style';

import { v4 } from 'uuid';

import { contextWrapper } from './../TemplateContext';
import * as templateState from '../../../app/redux/state';

const fakeSegments = [
  { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' },
  { id: 2, text: 'Donec venenatis dolor id ex sodales consequat. ' },
  {
    id: 3,
    text:
      'Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. '
  },
  {
    id: 4,
    text:
      'Praesent euismod dui ut ante fermentum, sed consectetur lacus pretium. Vestibulum ornare sollicitudin lectus at ultrices. '
  },
  { id: 5, text: 'Mauris ultricies pellentesque est vel maximus. ' }
];

interface IContentProps {
  asd: string;
  template: {
    id: number;
    name: string;
    contentOutine: templateState.contentOutine;
    blocks: templateState.block[];
    paragraphs: templateState.paragraph[];
    textSegments: templateState.textSegment[];
  };
}

class TemplateContent extends React.Component<IContentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeSegment: null
    };
  }

  public handleClick = (e: any, segment: any): void => {
    this.setState({ activeSegment: segment });
  };

  public handleEscapeOutside = (): void => {
    this.setState({ activeSegment: null });
  };

  public renderSegment = (segment: any): any => {
    const { activeSegment } = this.state;

    if (!activeSegment || segment.id !== activeSegment.id) {
      return [
        <TextHover key={v4()} onClick={e => this.handleClick(e, segment)}>
          <TextHoverFeature className="text-hover-feat">
            <Icon name="move" size="small" />
          </TextHoverFeature>
          <TextNode className="text-node">{segment.text}</TextNode>
        </TextHover>,
        <VariantCount key={v4()} className="variant-count">
          3 <CompareArrows />
        </VariantCount>
      ];
    }

    return (
      <Variants segment={segment} onEscapeOutside={this.handleEscapeOutside} />
    );
  };

  public getArticles = (
    contentOutine: templateState.contentOutine,
    blocks: templateState.block[],
    paragraphs: templateState.paragraph[],
    textSegments: templateState.textSegment[]
  ): any => {
    return contentOutine.articles.map(article => {
      const blockId = article.blockId;

      return <div key={article.id}>sldkjf</div>;

      // return (
      //   <div key={article.id}>
      //     <h1>{article.name}</h1>
      //     {this.getSecitons(
      //       sections,
      //       subSections,
      //       clauses,
      //       subClauses,
      //       textSegments,
      //       article.id
      //     )}
      //     <br />
      //   </div>
      // );
    });
  };

  // public getSecitons = (
  //   sections: templateState.section[],
  //   subSections: templateState.subSection[],
  //   clauses: templateState.clause[],
  //   subClauses: templateState.subClause[],
  //   textSegments: templateState.textSegment[],
  //   articleId?: number
  // ): any => {
  //   const filteredArray = sections.filter(
  //     (section: { id: number; name: string; ref: { articleId: number } }) => {
  //       return section.ref.articleId === articleId;
  //     }
  //   );

  //   return filteredArray.map(section => {
  //     return (
  //       <div key={section.id}>
  //         <h2>{section.name}</h2>
  //         {this.getSubSecitons(
  //           subSections,
  //           clauses,
  //           subClauses,
  //           textSegments,
  //           section.id
  //         )}
  //         <br />
  //       </div>
  //     );
  //   });
  // };

  // public getSubSecitons = (
  //   subSections: templateState.subSection[],
  //   clauses: templateState.clause[],
  //   subClauses: templateState.subClause[],
  //   textSegments: templateState.textSegment[],
  //   sectionId?: number
  // ): any => {
  //   const filteredArray = subSections.filter(
  //     (subSection: {
  //       id: number;
  //       name: string;
  //       ref: { sectionId: number };
  //     }) => {
  //       return subSection.ref.sectionId === sectionId;
  //     }
  //   );

  //   return filteredArray.map(subSection => {
  //     return (
  //       <div key={subSection.id}>
  //         <h3>{subSection.name}</h3>
  //         {this.getClauses(clauses, subClauses, textSegments, subSection.id)}
  //         <br />
  //       </div>
  //     );
  //   });
  // };

  // public getClauses = (
  //   clauses: templateState.clause[],
  //   subClauses: templateState.subClause[],
  //   textSegments: templateState.textSegment[],
  //   subSectionId?: number
  // ): any => {
  //   const filteredArray = clauses.filter(
  //     (clause: { id: number; name: string; ref: { subSectionId: number } }) => {
  //       return clause.ref.subSectionId === subSectionId;
  //     }
  //   );

  //   return filteredArray.map(clause => {
  //     return (
  //       <div key={clause.id}>
  //         <h4>{clause.name}</h4>
  //         {this.getSubClauses(subClauses, textSegments, clause.id)}
  //         <br />
  //       </div>
  //     );
  //   });
  // };

  // public getSubClauses = (
  //   subClauses: templateState.subClause[],
  //   textSegments: templateState.textSegment[],
  //   clauseId?: number
  // ): any => {
  //   const filteredArray = subClauses.filter(
  //     (subClause: { id: number; name: string; ref: { clauseId: number } }) => {
  //       return subClause.ref.clauseId === clauseId;
  //     }
  //   );

  //   return filteredArray.map(subClause => {
  //     return (
  //       <div key={subClause.id}>
  //         <h5>{subClause.name}</h5>
  //         {this.getTextSegments(textSegments, subClause.id)}
  //         <br />
  //       </div>
  //     );
  //   });
  // };

  // public getTextSegments = (
  //   textSegments: templateState.textSegment[],
  //   subClauseId?: number
  // ): any => {
  //   const filteredArray = textSegments.filter(
  //     (textSegment: {
  //       id: number;
  //       sequence: number;
  //       segment: string;
  //       ref: { subClauseId: number };
  //     }) => {
  //       return textSegment.ref.subClauseId === subClauseId;
  //     }
  //   );

  //   return filteredArray.map(textSegment => {
  //     return (
  //       <span key={textSegment.id}>
  //         {textSegment.segment}
  //         <br />
  //       </span>
  //     );
  //   });
  // };

  public render() {
    const {
      contentOutine,
      blocks,
      paragraphs,
      textSegments
    } = this.props.template;

    return (
      <Grid.Column width={12}>
        <StyledDocument>
          {fakeSegments.map(segment => this.renderSegment(segment))}
          <br />
          <br />
          {this.getArticles(contentOutine, blocks, paragraphs, textSegments)}
        </StyledDocument>
      </Grid.Column>
    );
  }
}

export default contextWrapper(TemplateContent);
