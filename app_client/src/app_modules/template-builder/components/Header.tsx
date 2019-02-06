import * as React from 'react';

import { Header as HeaderBase, Icon } from 'semantic-ui-react';
import StyledHeader, { HeaderColumn, HeaderActions, HeaderAction } from './Header.style';
import Button from './../../../app/_styled_components/Button';


// interface IHeaderProps {

// }

// interface IHeaderState {

// }

export default class Header extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  
  public render() {
    return (
      <StyledHeader>
        <HeaderColumn>
          <a href='#'>
            <Icon link={true} name='chevron left' />
            <h1>
              Confidentiality Agreement
              <small>Never published &bull; Last saved June 7, 2018 at 3.12 PM</small>
            </h1>
            
          </a>
        </HeaderColumn>
        
        <HeaderColumn>
          <HeaderActions>
            <HeaderAction>
              1
            </HeaderAction>
            <HeaderAction>
              <Button>SAVE DRAFT</Button>
            </HeaderAction>
            <HeaderAction>
              <Button>PUBLISH</Button>
            </HeaderAction>
            <HeaderAction>
              4
            </HeaderAction>
          </HeaderActions>
        </HeaderColumn>
      </StyledHeader>
    );
  }
}