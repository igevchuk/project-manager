
import styled, { css } from 'styled-components';

const Header = styled.div`
  display: flex;
  padding: 0.5rem 32px;
`;

export const HeaderColumn = styled.div`
  flex: 1;
  & > a {
    color: #000;
    & > .icon {
      display: inline-block;
      vertical-align: middle;
    }
    & > h1 small {
      display: block;
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  text-align: right;
`;

export const HeaderAction = styled.div`

`;

export default Header;

