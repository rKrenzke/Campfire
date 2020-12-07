import React from 'react';
import { useHistory } from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter, Row} from "reactstrap";
import APIURL from '../helpers/environment';
import '../styles/Login.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHiking} from '@fortawesome/free-solid-svg-icons'


type PassedProps ={
    updateToken: (token: string) => void;
    open: boolean,
    close: () => void,
    adminStatus: () => void,
    setUser: (username: string) => void
  }

type UserState = {
    username: string,
    password: string
}


class Login extends React.Component<PassedProps, UserState> {
  constructor(props: PassedProps){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        username: '',
        password: ''
      };    
  };


  handleSubmit(event: any){
    event.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    fetch(`${APIURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: {username, password } }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert("Login not valid, please try again");
          } else if(data.isAdmin == true){
            this.props.adminStatus();
            this.props.updateToken(data.sessionToken);
            this.props.setUser(this.state.username);
            console.log(data.isAdmin);
            this.props.close();
          } else {
            this.props.updateToken(data.sessionToken);
            this.props.setUser(this.state.username);
            this.props.close();
          }
        });
    }
    render(){
      return(
        <div className="login" role="navigation">
          <Modal isOpen={this.props.open} id="loginModal">
            <ModalHeader id="modalHeader">
              <button type="button" className="close" onClick={this.props.close}>&times;</button>
              <h5 id="mainTitle">Welcome Back!</h5>
            </ModalHeader>
            <ModalBody id="modalBody">
                <div id="modalForm">
                  <Form id="loginForm" onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="loginrUsername">Username</Label>
                        <Input onChange={(event) => this.setState({username: event.target.value})} value={this.state.username} id="loginUsername"></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="loginPassword"> Password</Label>
                        <Input onChange={(event) => this.setState({password: event.target.value})} value={this.state.password} id="loginPassword" type="password"></Input>
                    </FormGroup>
                  </Form>
                </div>
        </ModalBody>
        <ModalFooter className="modalFooter">
          <Button form="loginForm" id="modalSubmitButton" type="submit">
            Login <FontAwesomeIcon icon={faHiking}></FontAwesomeIcon>
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
        )
    }
  }

  export default Login;