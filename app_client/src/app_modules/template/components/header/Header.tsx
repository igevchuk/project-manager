import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Icon } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import EditingModeButton from './EditingModeButton';
import AnnotationDropDown from './AnnotationDropDown';
import ExportModal from './ExportModal';
import StyledHeader, {
  HeaderColumn,
  HeaderActions,
  HeaderAction
} from './Header.style';
import Dropdown from './../../../../atomic/atoms/Dropdown';
import * as state from '../../../../app/redux/state';
import utils from './../../../../app/utils';

interface IHeaderProps {
  template: state.template;
}

const templateOptions = [
  { key: 1, text: 'Document History', value: 'History' },
  { key: 2, text: 'Export Template', value: 'Export' },
  { key: 3, text: 'Option 3', value: 'Option 3' }
];

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {main: '#43A047'},
    secondary: {main: '#002888'}
  }
});

interface IState {
  exportModal: boolean
}

class Header extends React.Component<IHeaderProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      exportModal: false
    }
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

  public handleOptionSelect = (data) => {
    switch (data.value) {
      case 'Export':
        return this.setState({ exportModal: true });

      default:
        break;
    }
  }

  public handleCloseExport = () => {
    return this.setState({ exportModal: false });
  }

  public render() {
    const { exportModal } = this.state;
    const { template } = this.props;

    if (!template) {
      return null;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <StyledHeader>
          <ExportModal 
            open={exportModal} 
            templateName={template.name || ''}
            handleClose={this.handleCloseExport}
          />
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
            <AnnotationDropDown template={template}/>
          </HeaderColumn>

          <HeaderColumn>
            <HeaderActions>
              <HeaderAction>
                <EditingModeButton />
              </HeaderAction>
              <HeaderAction>
                <Button color='secondary' variant="contained">
                  SAVE DRAFT
                </Button>
              </HeaderAction>
              <HeaderAction>
                <Button color='primary' variant="contained">
                  PUBLISH
                </Button>
              </HeaderAction>
              <HeaderAction>
                <Dropdown
                  direction="left"
                  floating={true}
                  icon={null}
                  trigger={<Icon name="ellipsis vertical" />}
                  options={templateOptions}
                  pointing={false}
                  selection={false}
                  onChange={(e, data) => this.handleOptionSelect(data)}
                />
              </HeaderAction>
            </HeaderActions>
          </HeaderColumn>
        </StyledHeader>
      </MuiThemeProvider>
    );
  }
}

export default Header