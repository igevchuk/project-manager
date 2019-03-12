import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

// import { languageOptions } from '../common'
const languageOptions = [{ key: 'Arabic', text: 'Arabic', value: 'Arabic' }];

const DropdownExampleSearchDropdown = () => (
  <Dropdown
    button={true}
    className="icon"
    fluid={true}
    labeled={true}
    icon="search"
    options={languageOptions}
    search={true}
    text="Search ..."
  />
);

export default DropdownExampleSearchDropdown;
