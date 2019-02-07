
import styled, { css } from 'styled-components';

const Header = styled.div`
  background: rgb(232,234,246);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 32px;
`;

export const HeaderColumn = styled.div`
  display: flex;
  flex: 1;
  & > a {
    color: ${props => props.theme.colorRoles.primary};
    display: inline-flex;
    align-items: center;
    & > .icon {
      font-size: 22px;
      line-height: 1em;
      margin-right: 1rem;
      width: 32px;
    }
    & > h2 {
      font-size: 22px;
      font-weight: 300;
      line-height: 1em;
      margin-top: 0;
    }
    & > h2 small {
      color: ${props => props.theme.colorRoles.default};
      display: block;
      font-size: 12px;
    }
  }
  &:last-child {
    justify-content: flex-end;
  }
`;

export const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  align-content: flex-end;
  /* text-align: right; */
`;

export const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
`;

export default Header;

