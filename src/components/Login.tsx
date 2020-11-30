import React from 'react';
import { useHistory } from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter,} from "reactstrap";


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
    fetch("http://localhost:4000/user/login", {
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
            this.props.setUser(data.user.username);
            this.props.close();
          } else {
            this.props.updateToken(data.sessionToken);
            this.props.close();
          }
        });
    }
    render(){
      return(
        <div id="login" role="navigation">
          <Modal isOpen={this.props.open} id="loginModal">
            <ModalHeader className="modalHeader">
                <div id="mainTitle">Welcome Back!</div>
                <Button className="closeModal" onClick={this.props.close}><span>x</span></Button>
            </ModalHeader>
            <ModalBody id="modalBody">
              <div id="modalImage"></div>
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
            Login
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
        )
    }
  }

  export default Login;