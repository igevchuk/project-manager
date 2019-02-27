import * as React from 'react';
import { Grid } from 'semantic-ui-react';

import Document from './document/Document';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';
import { Provider } from './../TemplateContext';
import templateReducer from '../../../app/redux/reducer';
import * as state from '../../../app/redux/state';

interface IProps {
  template: state.template;
}

const Entry: React.SFC<IProps> = props => {
  const [templateState, dispatch] = React.useReducer(templateReducer, {
    activeId: '',
    templates: [props.template]
  });

  const template = templateState.templates[0];

  return (
    <div>
      {/* <Header template={template} /> */}
      <Provider value={{ dispatch }}>
        <Toolbar />
      </Provider>

      <Grid style={{ marginTop: 0 }}>
        <Provider value={{ dispatch }}>
          <Document template={template} />
        </Provider>

        <Provider value={{ dispatch }}>
          <Sidebar template={template} />
        </Provider>
      </Grid>
    </div>
  );
};

export default Entry;
