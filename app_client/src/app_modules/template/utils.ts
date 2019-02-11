// import { v4 } from 'uuid';

// import * as templateState from '../../app/redux/state';
// import Template from './Template';

// interface IContentProps {
//   template: {
//     id: number;
//     name: string;
//     version: number;
//     versionIsPublished: number;
//     lastSaved: number;
//     lastPublished: number;
//     editIsLocked: number;
//     editLockedBy: number;

//     blocks: templateState.block[];
//     tableRows: templateState.tableRow[];
//     tableColumns: templateState.tableCell[];
//     tableParagraphs: templateState.tableParagraph[];
//     textSegments: templateState.textSegment[];
//     variables: templateState.variable[];
//     runs: templateState.run[];
//     history: templateState.history;
//   };
// }

// class Template {
//   public getBlocks = (textSegments: templateState.textSegment[]): any => {
//     return textSegments.map(textSegment => {
//       return (
//         <div key={article.id}>
//           <h1>{article.name}</h1>
//           {this.getSecitons(
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
//           {this.getSecitons(
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

//   public getSecitons = (
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
//           {this.getSubSecitons(
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

//   public getSubSecitons = (
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
