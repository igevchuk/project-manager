import * as React from 'react';

import { Button, Icon, Segment } from 'semantic-ui-react';
import Toggle from './../../../app/_styled_components/Toggle';
import StyledPlaybookRule, { PlaybookGroup, PlaybookHeader, PlaybookCard } from './PlaybookRule.style';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  public render() {
    return (
      [
        <PlaybookGroup key='acceptable'>
          <PlaybookHeader>
            <h3>Acceptable Language</h3>
            <Button>
              <Icon name='plus circle' /> ADD RULE
            </Button>
          </PlaybookHeader>

          <PlaybookCard>
            <p>Cosmetic Change</p>
            <Toggle />
          </PlaybookCard>

          <PlaybookCard>
            <p>Cosmetic Change</p>
            <Toggle />
          </PlaybookCard>

          <PlaybookCard>
            <p>Cosmetic Change</p>
            <Toggle />
          </PlaybookCard>
        </PlaybookGroup>,
        <PlaybookGroup key='conditional'>
          <PlaybookHeader>
            <h3>Conditional Language</h3>
            <Button>
              <Icon name='plus circle' /> ADD RULE
            </Button>
          </PlaybookHeader>

          <PlaybookCard>
            <p>Cosmetic Change</p>
            <Toggle />
          </PlaybookCard>
        </PlaybookGroup>,
        <PlaybookGroup key='escalations'>
          <PlaybookHeader>
            <h3>Escalations</h3>
            <Button>
              <Icon name='plus circle' /> ADD RULE
            </Button>
          </PlaybookHeader>

          <PlaybookCard>
            <p>Cosmetic Change</p>
            <Toggle />
          </PlaybookCard>
        </PlaybookGroup>
      ]
    );
  }
}