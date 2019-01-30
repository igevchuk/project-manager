import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderComponent = styled.div`
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

const HeaderBrand = styled.div`
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

const LogOut = styled.div`
  a {
    color: #ffffff;
    font-size: 19px;
    line-height: 16px;
    text-transform: none;
  }
`

class Header extends Component {
  render() {
    return (
      <HeaderComponent className="header">
        <HeaderBrand>
          <Link to="/">
            <img src="/src/assets/images/Dtrax_logo_white.png" />
          </Link>
          
          <h1>Admin Portal</h1>
        </HeaderBrand>

        <LogOut>
          <a href='/logout'>
            Logout
          </a>
        </LogOut>
      </HeaderComponent>
    );
  }
}

export default Header;
