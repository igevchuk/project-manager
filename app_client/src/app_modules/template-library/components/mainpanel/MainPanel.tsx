import * as React from 'react';
import Templates from '../templates/Templates';
import StyledMainPanel from './MainPanel.style';

class MainPanel extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <StyledMainPanel>
        <Templates />
      </StyledMainPanel>
    );
  }
}
export default MainPanel;
