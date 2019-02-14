import * as React from 'react';
// import React, { useState } from 'react';

import { contextWrapper } from '../../TemplateContext';
import * as templateState from '../../../../app/redux/state';

interface IContentProps {
  template: {
    id: number;
    name: string;
    blocks: templateState.block[];
    paragraphs: templateState.paragraph[];
    textSegments: templateState.textSegment[];
  };
}

interface IContentState {
  template: {
    id: number;
    name: string;
    blocks: templateState.block[];
    paragraphs: templateState.paragraph[];
    textSegments: templateState.textSegment[];
  };
}
const Schema: React.SFC<IContentProps> = props => {
  // console.log(props.template);
  const asd = () => {
    return 'lsdkfj';
  };
  return null;
};
export default contextWrapper(Schema);

// export class Schema extends React.Component<IContentProps, IContentState> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       template: this.props.template
//     };
//   }

//   public componentDidMount() {
//     this.setState(
//       (prevState, props) => ({ template: this.props.template }),
//       () => {
//         // console.log(this.state.template);
//       }
//     );
//   }

//   public Add(): void {
//     console.log(this.state.template);
//   }

//   public render() {
//     const { blocks, paragraphs, textSegments } = this.props.template;
//     return null;
//   }
// }

// export default contextWrapper(Schema);

// export const aa = () => {
//   const asd = new Schema({});
//   asd.Add();
// };
