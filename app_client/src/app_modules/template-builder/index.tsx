import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';

import { Provider } from './TemplateContext';
import { Grid } from 'semantic-ui-react';
import Content from './components/Content';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import Variant from '../template/components/Variant';
import * as state from './../../app/redux/state';
import * as actions from './../../app/redux/actions';

type Action = ActionType<typeof actions>;
interface ITemplateProps {
  template: state.template;
}

interface ITemplateState {
  template: state.template;
}

class TemplateBuilder extends React.Component<ITemplateProps, ITemplateState> {
  constructor(props) {
    super(props);
    this.state = {
      template: {}
    };
  }

  public componentDidMount() {
    this.setState(
      (prevState, props) => ({ template: this.props.template })
    );
  }

  public render() {
    const { template } = this.props;
    
    if(!template) {
      return null;
    }

    return (
      <div>
        <Header template={ template } />
        <Provider value={{ template }}>
          <Toolbar />
        </Provider>

        <Grid style={{ marginTop: 0 }}>
          <Provider value={{ template }}>
            <Content />
          </Provider>

          <Provider value={{ template }}>
            <Sidebar />
          </Provider>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const templates = state.templateReducer.templates;
  if (templates.length === 0) {
    return {};
  }

  return { template: templates[0] };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilder);
