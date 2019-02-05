import * as React from 'react';
import { contextWrapper } from './../TemplateContext';
import * as state from '../../../app/redux/state';

interface ITemplateProps {
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

class Form extends React.Component<ITemplateProps> {
  public render() {
    console.log(this.props);
    return <div>{this.props.asd}</div>;
  }
}

export default contextWrapper(Form);
