import * as React from "react";
import { HeaderBrand, HeaderComponent, ItemHeader } from './Header.style';
import dTraxLogo from "./../../assets/images/dTrax_logo.png";
import DeloitteLogo from "./../../assets/images/Deloitte_logo.png";

interface IHeaderProps { 
  isAdmin: boolean;
 }

const Header: React.SFC<IHeaderProps> = ({ isAdmin, ...props }) => {
  return (
    <HeaderComponent className="header">
      <HeaderBrand>
        <ItemHeader style={{ marginRight: '0px' }}>
          <a href="/" style={{ borderRight: '1px solid white' }}>
            {<img src={dTraxLogo} style={{height: '17px'}}/>}
          </a>
        </ItemHeader>
        <ItemHeader style={{marginRight:'1px'}}>
          <a href="/" style={{ padding:'10px'}}>
            {<img src={DeloitteLogo} style={{ height: '17px' }} />}
          </a>
        </ItemHeader>
        <ItemHeader>
          <a href='/template' style={{
            background:'rgba(255,255,255,0.1)',
            marginRight:'10px',
            padding:'15px 10px',
          }}>
            Contract Templates
          </a>
        </ItemHeader>
        {
          !isAdmin && (
            <ItemHeader>
              <a href='/contract_negotiation'>
                Documents
              </a>
            </ItemHeader>
          )
        }
      </HeaderBrand>

      <ItemHeader>
        <a href='/logout'>
          Logout
        </a>
      </ItemHeader>
    </HeaderComponent>
  );
}

export default Header;
