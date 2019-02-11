import * as React from 'react';

import { Grid, Icon } from 'semantic-ui-react';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Variants from './Variants';
import {
  StyledContent,
  TextHover,
  TextHoverFeature,
  TextNode,
  VariantCount
} from './Content.style';

import { v4 } from 'uuid';

import { contextWrapper } from '../TemplateContext';
import * as templateState from '../../../app/redux/state';

interface IContentProps {
  template: {
    id: number;
    name: string;
    contentOutline: templateState.contentOutline;
    blocks: templateState.block[];
    paragraphs: templateState.paragraph[];
    textSegments: templateState.textSegment[];
    textVariants: templateState.textVariant[];
  };
  handleAddTextVariant?: (textVariant: templateState.textVariant) => void;
}

interface IContentState {
  activeSegment: templateState.textSegment | null;
}

class Content extends React.Component<IContentProps, IContentState> {
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
    const segmentVariants = this.getTextVariants(segment);

    if (!activeSegment || segment.id !== activeSegment.id) {
      return [
        <TextHover key={v4()} onClick={e => this.handleClick(e, segment)}>
          <TextHoverFeature className="text-hover-feat">
            <Icon name="move" size="small" />
          </TextHoverFeature>
          <TextNode className="text-node">{segment.text}</TextNode>
        </TextHover>,
        <VariantCount key={v4()} className="variant-count">
          { segmentVariants.length } <CompareArrows />
        </VariantCount>
      ];
    }

    return (
      <Variants 
        segmentId={segment.id}
        textVariants={segmentVariants} 
        onEscapeOutside={this.handleEscapeOutside} 
      />
    );
  };

  public getArticles = (
    contentOutline: templateState.contentOutline,
    blocks: templateState.block[],
    paragraphs: templateState.paragraph[],
    textSegments: templateState.textSegment[]
  ): any => {
    return contentOutline.articles
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
              contentOutline,
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
    contentOutline: templateState.contentOutline,
    // blocks: templateState.block[],
    paragraphs: templateState.paragraph[],
    textSegments: templateState.textSegment[],
    articleId?: number
  ): any => {
    const filteredArray = contentOutline.sections.filter(
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
          {this.getSubSections(
            contentOutline,
            paragraphs,
            textSegments,
            section.id
          )}
          <br />
        </div>
      );
    });
  };

  public getSubSections = (
    contentOutline: templateState.contentOutline,
    paragraphs: templateState.paragraph[],
    textSegments: templateState.textSegment[],
    sectionId?: number
  ): any => {
    const filteredArray = contentOutline.subSections.filter(
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

      return filteredTextSegments.map(textSegment => {
        return (
          <div key={textSegment.id}>
            {this.renderSegment({ id: textSegment.id, text: textSegment.text })}
          </div>
        );
      });
    });
  };

  public getTextVariants = (segment: any) => {
    const { textVariants } = this.props.template;
    
    if(!textVariants || !segment) {
      return [];
    }

    return textVariants.filter(({ref}) => segment.id === ref.segmentId);
  }

  public render() {
    const {
      contentOutline,
      blocks,
      paragraphs,
      textSegments
    } = this.props.template;

    return (
      <Grid.Column width={12}>
        <StyledContent>
          {this.getArticles(contentOutline, blocks, paragraphs, textSegments)}
        </StyledContent>
      </Grid.Column>
    );
  }
}

export default contextWrapper(Content);
