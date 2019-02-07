import * as React from 'react';

import { contextWrapper } from './../TemplateContext';
import * as templateState from '../../../app/redux/state';

interface IProps {
  template: {
    id: number;
    name: string;
    selectedType: number;
    articles: templateState.article[];
    sections: templateState.section[];
    subSections: templateState.subSection[];
    clauses: templateState.clause[];
    subClauses: templateState.subClause[];
    textSegments: templateState.textSegment[];
  };
}
const SidebarPlaybook: React.SFC<IProps> = props => {
  const template = props.template;

  return <div>{template.name + 'aaaa'}asd</div>;
};

export default contextWrapper(SidebarPlaybook);
