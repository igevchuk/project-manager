import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Icon } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import EditingModeButton from './EditingModeButton';
import StyledHeader, {
  HeaderColumn,
  HeaderActions,
  HeaderAction
} from './Header.style';
import Dropdown from './../../../../atomic/atoms/Dropdown';
import * as state from '../../../../app/redux/state';
import utils from './../../../../app/utils';

interface IHeaderProps {
  template?: state.template;
}

const fakeOptions = [
  { key: 1, text: 'Option 1', value: 'Option 1' },
  { key: 2, text: 'Option 2', value: 'Option 2' },
  { key: 3, text: 'Option 3', value: 'Option 3' }
];

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main: '#43A047' },
    secondary: { main: '#002888' }
  }
});

class Header extends React.Component<IHeaderProps, {}> {
  constructor(props) {
    super(props);
  }

  public getLastUpdated = (lastUpdated, type) => {
    if (!!lastUpdated) {
      const timeString =
        utils.formatDate(lastUpdated, 'MMMM D, YYYY') +
        ' at ' +
        utils.formatDate(lastUpdated, 'h:mm A');
      return `Last ${type} ${timeString}`;
    }

    return `Never ${type}`;
  };

  public render() {
    const { template } = this.props;

    if (!template) {
      return null;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <StyledHeader>
          <HeaderColumn>
            <a href="#">
              <Icon link={true} name="chevron left" />
              <h2>
                {template.name}
                <small>
                  {this.getLastUpdated(template.lastPublished, 'published')}{' '}
                  &bull;&nbsp;
                  {this.getLastUpdated(template.lastSaved, 'saved')}
                </small>
              </h2>
            </a>
          </HeaderColumn>

          <HeaderColumn>
            <HeaderActions>
              <HeaderAction>
                <EditingModeButton />
              </HeaderAction>
              <HeaderAction>
                <Button color="secondary" variant="contained">
                  SAVE DRAFT
                </Button>
              </HeaderAction>
              <HeaderAction>
                <Button color="primary" variant="contained">
                  PUBLISH
                </Button>
              </HeaderAction>
              <HeaderAction>
                <Dropdown
                  direction="left"
                  floating={true}
                  icon="ellipsis vertical"
                  options={fakeOptions}
                  pointing={false}
                  selection={false}
                />
              </HeaderAction>
            </HeaderActions>
          </HeaderColumn>
        </StyledHeader>
      </MuiThemeProvider>
    );
  }
}

export default Header;
