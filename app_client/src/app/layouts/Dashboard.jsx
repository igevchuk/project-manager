import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { css, injectGlobal } from 'styled-components';

import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';
import dashboardRoutes from '@routes/dashboard';

injectGlobal`
  @font-face {
    font-family: 'Roboto';
    src: url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto',
    'Helvetica',
    'Arial',
    'Roboto',
    sans-serif;
    #root {
      position: relative;
      z-index: 1;
    }
    .smc-portal {
      position: relative;
      z-index: 2;
    }
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  padding-top: 64px;
`;

const offset = css`
  width: ${props => `calc(100vw - ${props.theme.sidebarWidth})`};
  left: ${props => props.theme.sidebarWidth};
`;

const MainPanel = styled.div`
  position: relative;
  min-height: calc(100vh - 64px);
  ${props => props.offset && offset};
  background: #f5f5f5;
`;

const Content = styled.div`
  /* margin-top: ${props => props.theme.headerHeight}; */
`;

const flattenedRoutes = dashboardRoutes.reduce(
  (acc, val) =>
    !!val.children && val.children.length > 0
      ? [...acc, ...[val], ...val.children]
      : acc.concat(val),
  []
);

const switchRoutes = (
  <Switch>
    {flattenedRoutes.map(({ component: Component, ...prop }, key) => {
      return (
        <Route
          exact={prop.exact}
          path={prop.path}
          key={key}
          render={props => <Component {...props} />}
        />
      );
    })}
  </Switch>
);

const Dashboard = props => {
  const {
    location: { pathname }
  } = props;
  const shouldRenderNavBar = flattenedRoutes.find(
    route => route.path === pathname && !route.collapseNavBar
  );

  return (
    <Wrapper className="dashboard">
      <Header />

      {shouldRenderNavBar && <Sidebar routes={dashboardRoutes} {...props} />}

      <MainPanel className="dashboard-panel" offset={shouldRenderNavBar}>
        <Content className="dashboard-content">{switchRoutes}</Content>
      </MainPanel>
    </Wrapper>
  );
};

export default Dashboard;
