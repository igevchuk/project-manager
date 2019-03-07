import * as React from 'react';

import { Button, Icon } from 'semantic-ui-react';
import Toggle from './../../../../atomic/atoms/Toggle';
import PlaybookModal from './PlaybookModal';
import {
  PlaybookGroup,
  PlaybookHeader,
  PlaybookCard
} from './PlaybookRule.style';


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return [
      <PlaybookGroup key="acceptable">
        <PlaybookHeader>
          <h3>Acceptable Language</h3>
          <PlaybookModal
            newRule={true}
            ruleType="acceptable"
          />
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
      <PlaybookGroup key="conditional">
        <PlaybookHeader>
          <h3>Conditional Language</h3>
          <PlaybookModal
            newRule={true}
            ruleType="conditional"
          />
        </PlaybookHeader>

        <PlaybookCard>
          <p>Cosmetic Change</p>
          <Toggle />
        </PlaybookCard>
      </PlaybookGroup>,
      <PlaybookGroup key="escalations">
        <PlaybookHeader>
          <h3>Escalations</h3>
          <PlaybookModal
            newRule={true}
            ruleType="escalations"
          />
        </PlaybookHeader>

        <PlaybookCard>
          <p>Cosmetic Change</p>
          <Toggle />
        </PlaybookCard>
      </PlaybookGroup>
    ];
  }
}
