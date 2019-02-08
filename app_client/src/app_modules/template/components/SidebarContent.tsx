import * as React from 'react';
import { StyledSidebar } from './Sidebar.style';

interface IProps {
  render: React.ReactNode;
}
const SidebarContent: React.SFC<IProps> = props => {
  return <StyledSidebar>{props.render}</StyledSidebar>;
};

export default SidebarContent;
