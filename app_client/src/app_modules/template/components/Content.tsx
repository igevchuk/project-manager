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
    return contentOutine.articles
      .sort((a, b) => a.sequence - b.sequence)
      .map(article => {
        const blockId = article.blockId;

        const paragraph = paragraphs.filter(
          paragraph => paragraph.ref.blockId === blockId
        )[0];

        const filteredTextSegments = textSegments.filter(
          textSegment => textSegment.ref.paragraphId === paragraph.id
        )[0];

        return (
          <div key={article.id}>
            <h1>{filteredTextSegments.text}</h1>
            {this.getSecitons(
              contentOutine,
              // blocks,
              paragraphs,
              textSegments,
              article.id
            )}
            <br />
          </div>
        );
      });
  };

  public getSecitons = (
    contentOutine: templateState.contentOutine,
    // blocks: templateState.block[],
    paragraphs: templateState.paragraph[],
    textSegments: templateState.textSegment[],
    articleId?: number
  ): any => {
    const filteredArray = contentOutine.sections.filter(
      (section: {
        id: number;
        blockId: number;
        sequence: number;
        ref: { articleId: number };
      }) => {
        return section.ref.articleId === articleId;
      }
    );

    return filteredArray.map(section => {
      const blockId = section.blockId;

      const paragraph = paragraphs.filter(
        paragraph => paragraph.ref.blockId === blockId
      )[0];

      const filteredTextSegments = textSegments.filter(
        textSegment => textSegment.ref.paragraphId === paragraph.id
      )[0];

      return (
        <div key={section.id}>
          <h2>
            {`${filteredTextSegments.sequence}. ` + filteredTextSegments.text}
          </h2>
          {this.getSubSecitons(
            contentOutine,
            paragraphs,
            textSegments,
            section.id
          )}
          <br />
        </div>
      );
    });
  };

  public getSubSecitons = (
    contentOutine: templateState.contentOutine,
    paragraphs: templateState.paragraph[],
    textSegments: templateState.textSegment[],
    sectionId?: number
  ): any => {
    const filteredArray = contentOutine.subSections.filter(
      (subSection: {
        id: number;
        blockId: number;
        sequence: number;
        ref: { sectionId: number };
      }) => {
        return subSection.ref.sectionId === sectionId;
      }
    );

    return filteredArray.map(subSection => {
      const blockId = subSection.blockId;

      const paragraph = paragraphs.filter(
        paragraph => paragraph.ref.blockId === blockId
      )[0];

      const filteredTextSegments = textSegments.filter(
        textSegment => textSegment.ref.paragraphId === paragraph.id
      );

      console.log(filteredTextSegments);
      return filteredTextSegments.map(textSegment => {
        return (
          <div key={textSegment.id}>
            <h3>{textSegment.text}</h3>
            {this.renderSegment(textSegment.text)}
          </div>
        );
      });
    });
  };

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
