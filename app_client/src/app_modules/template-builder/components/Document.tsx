// import * as React from 'react';

// import { TextSegment, TextVariant } from './../redux/model';
// import { contextWrapper } from './../Context';
// import { Grid, Icon } from 'semantic-ui-react';
// import CompareArrows from '@material-ui/icons/CompareArrows';
// import Variants from './Variants';
// import {
//   StyledDocument,
//   TextHover,
//   TextHoverFeature,
//   TextNode,
//   VariantCount
// } from './Document.style';
// import * as templateState from '../../../app/redux/state';

// import { v4 } from 'uuid';

// const fakeSegments = [
//   { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' },
//   { id: 2, text: 'Donec venenatis dolor id ex sodales consequat. ' },
//   {
//     id: 3,
//     text:
//       'Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. '
//   },
//   {
//     id: 4,
//     text:
//       'Praesent euismod dui ut ante fermentum, sed consectetur lacus pretium. Vestibulum ornare sollicitudin lectus at ultrices. '
//   },
//   { id: 5, text: 'Mauris ultricies pellentesque est vel maximus. ' }
// ];

// const fakeVariants = [
//   {
//     id: 1,
//     title: "Standart/Neutral Language",
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
//     seq: 1
//   },
//   {
//     id: 2,
//     title: "Variant 2",
//     text: 'Donec venenatis dolor id ex sodales consequat. ',
//     seq: 2
//   },
//   {
//     id: 3,
//     title: "Variant 3",
//     text:
//       'Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. ',
//     seq: 3
//   },
//   {
//     id: 4,
//     title: "Variant 4",
//     text:
//       'Praesent euismod dui ut ante fermentum, sed consectetur lacus pretium. Vestibulum ornare sollicitudin lectus at ultrices. ',
//     seq: 4
//   },
//   {
//     id: 5,
//     title: "Variant 5",
//     text: 'Mauris ultricies pellentesque est vel maximus. ',
//     seq: 5
//   }
// ];

// interface IDocumentProps {
//   template: {
//     id: number;
//     name: string;
//     selectedType: number;
//     articles: templateState.article[];
//     sections: templateState.section[];
//     subSections: templateState.subSection[];
//     clauses: templateState.clause[];
//     subClauses: templateState.subClause[];
//     textSegments: templateState.textSegment[];
//     variants: templateState.textVariant[];
//   };
//   addVariant: (segmentId: number) => {type: string, segmentId: number};
//   editVariant: (variant: TextVariant) => {type: string, payload: templateState.textVariant};
// };

// interface IDocumentState {
//   activeSegment: TextSegment | null;
// };

// class Document extends React.Component<IDocumentProps, IDocumentState> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeSegment: null
//     };
//   }

//   public handleClick = (e: any, segment: any): void => {
//     this.setState({ activeSegment: segment });
//   };

//   public handleEscapeOutside = (): void => {
//     this.setState({ activeSegment: null });
//   };

//   public onContextMenu = (e) => {
//     e.preventDefault();
//     return false;
//   }

//   public renderSegment = (segment: any): any => {
//     const { addVariant, editVariant } = this.props;
//     const { activeSegment } = this.state;

//     if (!activeSegment || segment.id !== activeSegment.id) {
//       return [
//         <TextHover key={v4()} onClick={e => this.handleClick(e, segment)} onContextMenu={this.onContextMenu}>
//           <TextHoverFeature className="text-hover-feat">
//             <Icon name="move" size="small" />
//           </TextHoverFeature>
//           <TextNode className="text-node">{segment.text}</TextNode>
//         </TextHover>,
//         <VariantCount key={v4()} className="variant-count">
//           3 <CompareArrows />
//         </VariantCount>
//       ];
//     }

//     return (
//       <Variants
//         segment={segment}
//         onEscapeOutside={this.handleEscapeOutside}
//         addVariant={addVariant}
//         editVariant={editVariant}
//         textVariants={fakeVariants}
//       />
//     );
//   };

//   public getArticles = (
//     articles: templateState.article[],
//     sections: templateState.section[],
//     subSections: templateState.subSection[],
//     clauses: templateState.clause[],
//     subClauses: templateState.subClause[],
//     textSegments: templateState.textSegment[]
//   ): any => {
//     return articles.map(article => {
//       return (
//         <div key={article.id}>
//           <h1>{article.name}</h1>
//           {this.getSections(
//             sections,
//             subSections,
//             clauses,
//             subClauses,
//             textSegments,
//             article.id
//           )}
//           <br />
//         </div>
//       );
//     });
//   };

//   public getSections = (
//     sections: templateState.section[],
//     subSections: templateState.subSection[],
//     clauses: templateState.clause[],
//     subClauses: templateState.subClause[],
//     textSegments: templateState.textSegment[],
//     articleId?: number
//   ): any => {
//     const filteredArray = sections.filter(
//       (section: { id: number; name: string; ref: { articleId: number } }) => {
//         return section.ref.articleId === articleId;
//       }
//     );

//     return filteredArray.map(section => {
//       return (
//         <div key={section.id}>
//           <h2>{section.name}</h2>
//           {this.getSubSections(
//             subSections,
//             clauses,
//             subClauses,
//             textSegments,
//             section.id
//           )}
//           <br />
//         </div>
//       );
//     });
//   };

//   public getSubSections = (
//     subSections: templateState.subSection[],
//     clauses: templateState.clause[],
//     subClauses: templateState.subClause[],
//     textSegments: templateState.textSegment[],
//     sectionId?: number
//   ): any => {
//     const filteredArray = subSections.filter(
//       (subSection: {
//         id: number;
//         name: string;
//         ref: { sectionId: number };
//       }) => {
//         return subSection.ref.sectionId === sectionId;
//       }
//     );

//     return filteredArray.map(subSection => {
//       return (
//         <div key={subSection.id}>
//           <h3>{subSection.name}</h3>
//           {this.getClauses(clauses, subClauses, textSegments, subSection.id)}
//           <br />
//         </div>
//       );
//     });
//   };

//   public getClauses = (
//     clauses: templateState.clause[],
//     subClauses: templateState.subClause[],
//     textSegments: templateState.textSegment[],
//     subSectionId?: number
//   ): any => {
//     const filteredArray = clauses.filter(
//       (clause: { id: number; name: string; ref: { subSectionId: number } }) => {
//         return clause.ref.subSectionId === subSectionId;
//       }
//     );

//     return filteredArray.map(clause => {
//       return (
//         <div key={clause.id}>
//           <h4>{clause.name}</h4>
//           {this.getSubClauses(subClauses, textSegments, clause.id)}
//           <br />
//         </div>
//       );
//     });
//   };

//   public getSubClauses = (
//     subClauses: templateState.subClause[],
//     textSegments: templateState.textSegment[],
//     clauseId?: number
//   ): any => {
//     const filteredArray = subClauses.filter(
//       (subClause: { id: number; name: string; ref: { clauseId: number } }) => {
//         return subClause.ref.clauseId === clauseId;
//       }
//     );

//     return filteredArray.map(subClause => {
//       return (
//         <div key={subClause.id}>
//           <h5>{subClause.name}</h5>
//           {this.getTextSegments(textSegments, subClause.id)}
//           <br />
//         </div>
//       );
//     });
//   };

//   public getTextSegments = (
//     textSegments: templateState.textSegment[],
//     subClauseId?: number
//   ): any => {
//     const filteredArray = textSegments.filter(
//       (textSegment: {
//         id: number;
//         sequence: number;
//         segment: string;
//         ref: { subClauseId: number };
//       }) => {
//         return textSegment.ref.subClauseId === subClauseId;
//       }
//     );

//     return filteredArray.map(textSegment => {
//       return (
//         <span key={textSegment.id}>
//           {textSegment.segment}
//           <br />
//         </span>
//       );
//     });
//   };

//   public render() {
//     console.log(this.props)
//     if (!this.props.template) {
//       return null;
//     }

//     const {
//       articles,
//       sections,
//       subSections,
//       clauses,
//       subClauses,
//       textSegments
//     } = this.props.template;

//     return (
//       <Grid.Column width={12}>
//         <StyledDocument>
//           {fakeSegments.map(segment => this.renderSegment(segment))}
//           <br />
//           <br />
//           {this.getArticles(
//             articles,
//             sections,
//             subSections,
//             clauses,
//             subClauses,
//             textSegments
//           )}
//         </StyledDocument>
//       </Grid.Column>
//     );
//   }
// }

// export default contextWrapper(Document);
