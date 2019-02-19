import * as React from 'react';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from 'react-html-parser';

import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Grid
} from 'semantic-ui-react';

// import { Grid, Icon } from 'semantic-ui-react';
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
import Controller from './../controller';
import MainApp from './document/doc.controller';
import Schema from './document/schema';
import * as visitor from './document/visitor';
import * as strategy from './document/strategy';
import * as abstract from './document/abstract';
import * as schemaInstanc from './document/schema';

import { Test } from './document/test';

import * as templateState from '../../../app/redux/state';
import { instanceOf } from 'prop-types';
// import { any } from 'prop-types';

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

type docPiece = {
  id: number;
  text: string;
  // blockId?: number;
  // paragraphId?: number;
  // textSegmentId?: number;
  // run?: {};
};

interface IContentProps {
  template: {
    id: number;
    name: string;
    blocks: templateState.block[];
    paragraphs: templateState.paragraph[];
    textSegments: templateState.textSegment[];
    runs: templateState.run[];
  };
}

class TemplateContent extends React.Component<IContentProps, any> {
  public docPieces: docPiece[] = [];

  constructor(props: any) {
    super(props);
    this.state = {
      activeSegment: null,
      visible: false,
      template: {},
      docPieces: [
        {
          blockId: -1,
          paragraphId: -1,
          textSegmentId: -1,
          text: '',
          run: {}
        }
      ]
    };
  }

  public componentDidMount() {
    this.setState(
      (prevState, props) => ({ template: this.props.template }),
      () => {
        // console.log(this.state.template);
      }
    );
  }

  public handleHideClick = () => this.setState({ visible: false });
  public handleShowClick = () => this.setState({ visible: true });
  public handleSidebarHide = () => this.setState({ visible: false });

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

  // public getArticles = (
  //   paragraphs: templateState.paragraph[],
  //   textSegments: templateState.textSegment[]
  // ): any => {
  //   return contentOutine.articles
  //     .sort((a, b) => a.sequence - b.sequence)
  //     .map(article => {
  //       const blockId = article.blockId;

  //       const paragraph = paragraphs.filter(
  //         paragraph => paragraph.ref.blockId === blockId
  //       )[0];

  //       const filteredTextSegments = textSegments.filter(
  //         textSegment => textSegment.ref.paragraphId === paragraph.id
  //       )[0];

  //       return (
  //         <div key={article.id}>
  //           <h1>{filteredTextSegments.text}</h1>
  //           {this.getSecitons(paragraphs, textSegments, article.id)}
  //           <br />
  //         </div>
  //       );
  //     });
  // };

  // public getSecitons = (
  //   paragraphs: templateState.paragraph[],
  //   textSegments: templateState.textSegment[],
  //   articleId?: number
  // ): any => {
  //   const filteredArray = contentOutine.sections.filter(
  //     (section: {
  //       id: number;
  //       blockId: number;
  //       sequence: number;
  //       ref: { articleId: number };
  //     }) => {
  //       return section.ref.articleId === articleId;
  //     }
  //   );

  //   return filteredArray.map(section => {
  //     const blockId = section.blockId;

  //     const paragraph = paragraphs.filter(
  //       paragraph => paragraph.ref.blockId === blockId
  //     )[0];

  //     const filteredTextSegments = textSegments.filter(
  //       textSegment => textSegment.ref.paragraphId === paragraph.id
  //     )[0];

  //     return (
  //       <div key={section.id}>
  //         <h2>
  //           {`${filteredTextSegments.sequence}. ` + filteredTextSegments.text}
  //         </h2>
  //         {this.getSubSecitons(paragraphs, textSegments, section.id)}
  //         <br />
  //       </div>
  //     );
  //   });
  // };

  // public getSubSecitons = (
  //   paragraphs: templateState.paragraph[],
  //   textSegments: templateState.textSegment[],
  //   sectionId?: number
  // ): any => {
  //   const filteredArray = contentOutine.subSections.filter(
  //     (subSection: {
  //       id: number;
  //       blockId: number;
  //       sequence: number;
  //       ref: { sectionId: number };
  //     }) => {
  //       return subSection.ref.sectionId === sectionId;
  //     }
  //   );

  //   return filteredArray.map(subSection => {
  //     const blockId = subSection.blockId;

  //     const paragraph = paragraphs.filter(
  //       paragraph => paragraph.ref.blockId === blockId
  //     )[0];

  //     const filteredTextSegments = textSegments.filter(
  //       textSegment => textSegment.ref.paragraphId === paragraph.id
  //     );

  //     console.log(filteredTextSegments);
  //     return filteredTextSegments.map(textSegment => {
  //       return (
  //         <div key={textSegment.id}>
  //           {this.renderSegment({ id: textSegment.id, text: textSegment.text })}
  //         </div>
  //       );
  //     });
  //   });
  // };

  public asd = () => {
    alert('aaaa');
  };

  public getDoc(composite: abstract.TemplateComponent) {
    const childrenComposites = composite.getChildren();

    for (const childComposite of childrenComposites) {
      if (childComposite.metadata.isSegment) {
        const docPiece = {
          id: childComposite.metadata.segment.id,
          text: childComposite.metadata.segment.text
        };
        this.docPieces.push(docPiece);
      } else {
        this.getDoc(childComposite);
      }
    }
    // console.log(this.docPieces);
  }

  public render() {
    const { blocks, paragraphs, textSegments, runs } = this.props.template;

    const schema = new Schema({ blocks, paragraphs, textSegments, runs });
    schema.initTemplate();
    const Articles = schema.getArticleComponents();

    const ArticlesDoc = Articles.map(article => {
      article.display(0);
      this.getDoc(article);

      return article;
    });

    const aaaa = new Test();
    const renderHtml = <div>{aaaa.getHtml()}</div>;

    console.log(this.docPieces);
    // console.log(ArticlesDoc);

    return (
      <Grid.Column width={12}>
        <StyledDocument>
          <div>
            {/* {asd} */}
            {/* <Schema template={this.state.template} /> */}
            <Button.Group>
              <Button
                disabled={this.state.visible}
                onClick={this.handleShowClick}
              >
                Show sidebar
              </Button>
              <Button
                disabled={!this.state.visible}
                onClick={this.handleHideClick}
              >
                Hide sidebar
              </Button>
            </Button.Group>

            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted={true}
                onHide={this.handleSidebarHide}
                vertical={true}
                visible={this.state.visible}
                width="wide"
              >
                <div>
                  <Menu.Item as="a" header={true}>
                    Content Outline
                  </Menu.Item>
                  <Menu.Item as="a">
                    <div onClick={this.asd}>ARTICLE 1</div>
                  </Menu.Item>
                  <Menu.Item as="a">ARTICLE 2</Menu.Item>
                  <Menu.Item as="a">ARTICLE 3</Menu.Item>
                  <Menu.Item as="a">ARTICLE 4</Menu.Item>
                </div>
              </Sidebar>

              <Sidebar.Pusher>
                <Segment basic={true}>
                  {fakeSegments.map(segment => this.renderSegment(segment))}
                  <br />
                  {renderHtml}
                  <br />
                  {/* <div>{ArticlesDoc}</div> */}
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </StyledDocument>
      </Grid.Column>
    );
  }
}

export default contextWrapper(TemplateContent);
