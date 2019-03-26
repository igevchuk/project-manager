import * as React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import '@atlaskit/css-reset';
import ProviderWrapper from './TemplateContext';
import TemplateConsumer from './TemplateConsumer';

const TemplateProvider: React.SFC = () => {
  return (
    <ProviderWrapper>
      <TemplateConsumer />
    </ProviderWrapper>
  );
};

// export default DragDropContext(HTML5Backend)(TemplateProvider);

export default TemplateProvider;
