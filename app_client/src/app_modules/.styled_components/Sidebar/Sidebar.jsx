import React from "react";
import styled from "styled-components";
import classnames from "classnames";

import { Link } from "react-router-dom";

const SidebarComponent = styled.div`
  width: ${props => props.theme.sidebarWidth};
  height: 100vh;
  position: fixed;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

const List = styled.ul`
  padding: 8px 0;
  margin-top: 65px;
  &,
  & ul {
    list-style: none;
    padding-left: 0;
  }
  & > li {
    overflow-y: hidden;
    max-height: 54px;
    transition: 0.3s cubic-bezier(0, 1, 0.5, 1);
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 12px 24px;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
      > span {
        font-size: ${props => props.theme.baseFontSize};
        color: ${props => props.theme.default};
        padding: 0 16px;
        font-weight: ${props => props.theme.fontLight};
        line-height: 30px;
        font-family: ${props => props.theme.fontSans};
        margin: 0;
      }
    }
    .submenu {
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      a {
        padding-left: 48px;
      }
    }
  }
  & li.active {
    max-height: 999px;
    > a span {
      color: ${props => props.theme.secondary};
    }
    .submenu {
      max-height: 999px;
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      li.active a > span {
        color: ${props => props.theme.default};
        font-weight: bolder;
      }
    }
  }
`;

const Sidebar = props => {
  function getSubMenu(prop) {
    return (
      <ul className="submenu">
        {prop.children.map(link => (
          <li
            key={link.path}
            className={classnames({ active: activeRoute(link.path) })}
          >
            <Link to={link.path}>
              {!!link.icon && getIcon(link)}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  function activeRoute(routeName) {
    return !!~props.location.pathname.indexOf(routeName);
  }

  function getIcon(prop) {
    let Icon = prop.icon;
    let fill = "#424242";

    if (activeRoute(prop.path)) {
      fill = "#43A047";
    }
    return <Icon fill={fill} />;
  }

  const { routes } = props;

  return (
    <SidebarComponent className="dashboard-sidebar">
      <List className="sidebar">
        {routes.map((prop, key) => {
          if (prop.redirect || !prop.displayLink) return null;

          return (
            <li
              className={classnames({ active: activeRoute(prop.path) })}
              key={key}
            >
              <Link to={prop.path}>
                {!!prop.icon && getIcon(prop)}
                <span>{prop.label}</span>
              </Link>

              {!!prop.children && !!prop.children.length && getSubMenu(prop)}
            </li>
          );
        })}
      </List>
    </SidebarComponent>
  );
};

export default Sidebar;
