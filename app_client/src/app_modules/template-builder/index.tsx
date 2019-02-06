import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';

import { contextWrapper } from './Context';
import { Grid } from 'semantic-ui-react';
import Document from './components/Document';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { actions, model, state } from './redux';
import Variant from '../template/components/Variant';

type Action = ActionType<typeof actions>;

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
  textSegment: model.Segment[];
  textVariant: model.Variant[];
  dispatch: Dispatch<Action>;
  // dispatch: any;
};

interface ITemplateState {
  activeSegment: model.Segment | null 
}

class TemplateBuilder extends React.Component<ITemplateProps> {
  constructor(props, context) {
    super(props, context);
  }

  public render() {
    const { dispatch } = this.props;
    const { addVariant, editVariant } = actions;

    return (
      <div>
        <Toolbar />

        <Grid style={{ marginTop: 0 }}>
          <Document
            variants={[]}
            addVariant={(segmentId) => dispatch(actions.addVariant(segmentId))} 
            editVariant={(payload: model.Variant) => dispatch(actions.editVariant(payload))}
          />

          <Sidebar />
        </Grid>
      </div>
    );
  }
};

const mapStateToProps = ({ template }) => ({
  template
});

export default connect(mapStateToProps)(TemplateBuilder);


