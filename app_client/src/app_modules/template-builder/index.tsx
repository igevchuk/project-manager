import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';

import { Provider } from './Context';
import { Grid } from 'semantic-ui-react';
import Document from './components/Document';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { actions, model, state } from './redux';
import Variant from '../template/components/Variant';

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
      (prevState, props) => ({ template: this.props.template }),
      () => {
        console.log(this.state.template);
      }
    );
  }

  public render() {
    // const { dispatch } = this.props;
    const { addVariant, editVariant } = actions;

    return (
      <div>
        <Toolbar />

        <Grid style={{ marginTop: 0 }}>
          <Provider value={{ template: this.props.template }}>
            <Document 
              variants={[]}
              addVariant={(segmentId) => actions.addVariant(segmentId)}
              editVariant={(payload) => actions.editVariant(payload)}
            />
          </Provider>

          <Sidebar />
        </Grid>
      </div>
    );
  }
};

const mapStateToProps = state => {
  const templates = state.templateReducer.templates;
  if (templates.length === 0) {
    return {};
  }

  // console.log(templates[0]);
  return { template: templates[0] };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    // onFetchForm: () => dispatch(actions.fetchForm())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateBuilder);


