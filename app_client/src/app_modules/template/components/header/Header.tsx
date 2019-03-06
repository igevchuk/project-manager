import * as React from 'react';

import { Header as HeaderBase, Icon } from 'semantic-ui-react';
import { Edit } from '@material-ui/icons';
import StyledHeader, {
  HeaderColumn,
  HeaderActions,
  HeaderAction
} from './Header.style';
import Button from './../../../../atomic/atoms/Button';
import Dropdown from './../../../../atomic/atoms/Dropdown';
import * as state from '../../../../app/redux/state';
import utils from './../../../../app/utils';

interface IHeaderProps {
  template: state.template;
}

const fakeOptions = [
  { key: 1, text: 'Option 1', value: 'Option 1' },
  { key: 2, text: 'Option 2', value: 'Option 2' },
  { key: 3, text: 'Option 3', value: 'Option 3' }
];

export default class Header extends React.Component<IHeaderProps, {}> {
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
              <Edit />
              <span
                style={{
                  margin: '0 1rem',
                  fontSize: '12px',
                  lineHeight: '1.1em'
                }}
              >
                Editing mode
                <small style={{ display: 'block' }}>Checked out by you</small>
              </span>
              <Dropdown
                floating={true}
                options={fakeOptions}
                selection={false}
                text=""
              />
            </HeaderAction>
            <HeaderAction>
              <Button primary={true} raised={true}>
                SAVE DRAFT
              </Button>
            </HeaderAction>
            <HeaderAction>
              <Button secondary={true} raised={true}>
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
    );
  }
}
