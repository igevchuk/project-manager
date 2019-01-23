import styled from 'styled-components';

export const HeaderComponent = styled.div`
  padding: 0 32px;
  background-color: ${props => props.theme.darkblue};
  color: #FFFFFF;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderBrand = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  a {
    padding: 6px 12px 6px 0;
    display: inline-block;
    border-right: 1px solid #FFFFFF;
  }
  img {
    max-width: 84px;
  }
  h1 {
    font-size: 20px;
    font-weight: normal;
    line-height: 24px;
    padding: 12px 24px;
    margin: 0;
  }
`;

export const ItemHeader = styled.div`
  a {
    border-right: none;
    font-size: 14px;
    line-height: 16px;
    text-transform: none;
    color: #ffffff;
  }
`;