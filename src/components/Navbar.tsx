import React, { useState, useEffect, useRef } from "react";
import {Nav, NavLink, Navbar, NavbarBrand, NavItem, Collapse, NavbarToggler, Button,} from "reactstrap";
import Registration from './Registration';
import Login from './Login';
import '../styles/Navbar.css';
import { useHistory } from "react-router-dom";

type PassedProps ={
  updateToken: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  updateStatus: () => void;
  setUserName: (username: string) => void;
}

type NavState = {
  collapsed: boolean,
  showRegister: boolean,
  showLogin: boolean,
  hasScrolled: boolean
}


class Sitebar extends React.Component<PassedProps, NavState> {
    constructor(props: PassedProps){
      super(props);
      this.closeRegister = this.closeRegister.bind(this);
      this.closeLogin = this.closeLogin.bind(this);
      this.state ={
        collapsed: true,
        showRegister: false,
        showLogin: false,
        hasScrolled: false
      } 
    }

    closeRegister(){
      this.setState({showRegister: false})
    }

    closeLogin(){
      this.setState({showLogin: false})
    }
    
    render(){
        return(
        <div /*id="navbar" className={classNames({
        "is-expanded": !collapsed,
        "has-scrolled": hasScrolled,
      })}*/
    >
      <Navbar id="navbar" color="faded" light expand="md">
        <NavbarBrand id="brand" href="/" className="mr-auto"><span>MI</span>CAMPFIRE</NavbarBrand>
        <NavbarToggler onClick={() => this.setState({collapsed: !this.state.collapsed})} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav id="navLinks" navbar className="navbar-nav ml-auto fullwidth justify-content-end">
            <>
            {this.props.isAdmin ? <NavItem><NavLink href="/admin">Manage Users</NavLink></NavItem> : <></>}
            </>
    {!this.props.isLoggedIn ? (
              <>
                <NavItem>
                  <NavLink href="/search">Campsites</NavLink>
                </NavItem>
                <NavItem>
                <Button onClick={() => this.setState({showLogin: true})}>Login</Button>
                </NavItem>
                <NavItem>
                  <Button onClick={() => this.setState({showRegister: true})}>SignUp</Button>
                </NavItem>
              </>
            ) : null}
           {this.props.isLoggedIn ? (
              <>
                <NavItem>
                  <NavLink href="/search">Campsites</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/campTrips">My Campfires</NavLink>
                </NavItem>
                <NavItem>
                  <Button onClick={this.props.logout}>Logout</Button>
                </NavItem>
              </>
            ) : null}
          </Nav>
        </Collapse>
      </Navbar>
      <Registration updateToken={this.props.updateToken} open={this.state.showRegister} close={this.closeRegister} setUser={this.props.setUserName}/>
      <Login updateToken={this.props.updateToken} open={this.state.showLogin} close={this.closeLogin} adminStatus={this.props.updateStatus} setUser={this.props.setUserName}/>
    </div>
        )
    }
}


export default Sitebar;