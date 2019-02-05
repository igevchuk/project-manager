import * as React from 'react';
import { contextWrapper } from './../TemplateContext';
import * as state from '../../../app/redux/state';

interface IContentProps {
  id: number;
  name: string;
  asd: string;
  selectedType: number;
  article: state.article[];
  section: state.section[];
  subSection: [];
  clause: [];
  subClause: [];
  textSegment: [];
}

class TemplateContent extends React.Component<IContentProps> {
  public render() {
    console.log(this.props);
    return <div>{this.props.asd}</div>;
  }
}

export default contextWrapper(TemplateContent);
