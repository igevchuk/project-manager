import * as React from 'react';

export const { Provider, Consumer } = React.createContext({});

export const contextWrapper = WrappedComponent => {
  return props => {
    return (
      <Consumer>{value => <WrappedComponent {...props} {...value} />}</Consumer>
    );
  };
};

// import * as React from 'react';
// import { connect } from 'react-redux';
// import * as state from '../../app/redux/state';
// import * as _ from 'lodash';

// import appReducer, { initialState as appState } from '../../app/redux/reducer';
// import templateReducer, { initialState as segmentState } from './redux/reducer';

// const TemplateContext = React.createContext({});

// export const contextWrapper = WrappedComponent => {
//   return props => {
//     return (
//       <TemplateContext.Consumer>
//         {value => <WrappedComponent {...props} {...value} />}
//       </TemplateContext.Consumer>
//     );
//   };
// };
// interface ITemplateProps {
//   template: state.template;
//   blocks: state.renderBlock[];
//   variants: state.segmentSource[][];
// }

// const TemplateProvider: React.SFC<ITemplateProps> = props => {
//   const [templateState, appDispatch] = React.useReducer(appReducer, {
//     ...appState,
//     template: props.template,
//     renderBlocks: props.blocks,
//     variants: props.variants
//   });

//   // const [subState, templateDispatch] = React.useReducer(templateReducer, {
//   //   ...segmentState
//   // });

//   const provider = () => {
//     const variant = (
//       <TemplateContext.Provider
//         value={{
//           // templateDispatch,
//           appDispatch,
//           template: props.template,
//           blocks: props.blocks,
//           variants: props.variants
//         }}
//       >
//         {props.children}
//       </TemplateContext.Provider>
//     );

//     return variant;
//   };

//   return provider();
// };

// const mapStateToProps = appState => {
//   const template = appState.appReducer.template;
//   const blocks = appState.appReducer.renderBlocks;
//   const variants = appState.appReducer.variants;

//   return { template, blocks, variants };
// };

// const ProviderWrapper = connect(mapStateToProps)(TemplateProvider);

// export default ProviderWrapper;
