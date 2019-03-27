import styled from 'styled-components';

export default styled.div `
  width: 256px;
  display: inline-block;
  height: calc(100vh - 64px);
  position: fixed;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.13);
`

export const List = styled.ul`
  &,
  & ul {
    list-style: none;
    padding-left: 0;
    font-size: 18px;
  }
  & > li {
    /* overflow-y: hidden; */
    max-height: 54px;
    transition: 0.3s cubic-bezier(0, 1, 0.5, 1);
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 15px 0px 15px 20px;
      > span {
        padding: 0 16px;
        line-height: 20px;
        margin: 0;
      }
    }
    .submenu {
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      a {
        padding: 0px 0px 12px 48px;
      }
    }
  }
  & li.active {
    background-color: #F5F5F5;
    color: rgb(67, 160, 71);
    max-height: 999px;
    a {
      color: rgb(67, 160, 71);
    }
    > a span {
      color: rgb(67, 160, 71);
      font-weight: bold;
    }
  }
`;

