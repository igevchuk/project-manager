import * as React from 'react';

import { contextWrapper } from './../../TemplateContext';
import * as templateState from '../../../../app/redux/state';

interface IProps {
  template: {
    id: number;
    name: string;
    version: number;
    versionIsPublished: number;
    lastSaved: number;
    lastPublished: number;
    editIsLocked: number;
    editLockedBy: number;

    blocks: templateState.block[];
    tableRows: templateState.tableRow[];
    tableColumns: templateState.tableCell[];
    tableParagraphs: templateState.tableParagraph[];
    textSegments: templateState.textSegment[];
    variables: templateState.variable[];
    runs: templateState.run[];
    history: templateState.history;
  };
}
const SidebarHistory: React.SFC<IProps> = props => {
  const template = props.template;

  return <div>{template.name + 'bbbb'}</div>;
};

export default contextWrapper(SidebarHistory);
