import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

const Header: React.SFC = () => {
  return (
    <header className="Header">
      <img src={logo} className="header-logo" alt="logo" />
      <h1 className="header-titile">Template Builder</h1>
      <nav>
        <Link to="/page1">Page1</Link>
        <Link to="/page2">Page2</Link>
      </nav>
    </header>
  );
};

export default Header;
