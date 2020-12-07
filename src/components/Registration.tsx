import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
  } from "reactstrap";
import APIURL from '../helpers/environment';

type AcceptProps ={
    updateToken: (token: string) => void,
    open: boolean,
    close: () => void,
    setUser: (username: string) => void
}

type UserState = {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string
}

const validateUsername = RegExp("((?=.*?[0-9]).*|(?=.*?[#?!@$%^&*-]).*)");

class HandleSubmit extends React.Component<AcceptProps, UserState> {
  constructor(props: AcceptProps){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      };    
  };

  handleSubmit(event: any){
    event.preventDefault();
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let passwordConfirm = this.state.passwordConfirm;
    try {
      if (!username || !email || !password) throw "Please fill out all fields";
  
      if (this.state.password.length < 5) throw "Password must be 5 or more characters";
  
      if (username.length < 4 || !validateUsername.test(username))
        throw "Username must be 4 or more characters and include 1 number and/or special character";
  
      if (password !== passwordConfirm) throw "Passwords do not match";
      
      fetch(`${APIURL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: {username, email, password } }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.props.updateToken(data.sessionToken);
          this.props.setUser(data.user.username);
          this.props.close();
          // history.push("/");
        })
        .catch((error) => console.log(error));
    } catch (error) {
      alert(error);
    }
  }
  render(){
    return(
        <div id="register" role="navigation">
            <Modal isOpen={this.props.open} id="registerModal">
            <ModalHeader id="modalHeader">
              <button type="button" className="close" onClick={this.props.close}>&times;</button>
              <h5 id="mainTitle">Welcome to MIcampfire!</h5>
            </ModalHeader>
                <ModalBody id="modalBody">
                    <div id="modalForm">
                  <Form id="registerForm" onSubmit={this.handleSubmit} >
          <FormGroup>
            <Label htmlFor="registerUsername">Username</Label>
            <Input
              onChange={(event) => this.setState({username: event.target.value})}
              value={this.state.username}
              id="registerUsername"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="registerEmail">Email</Label>
            <Input
              onChange={(event) => this.setState({email: event.target.value})}
              value={this.state.email}
              id="registerEmail"
              type="email"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="registerPassword"> Password</Label>
            <Input
              onChange={(event) => this.setState({password: event.target.value})}
              value={this.state.password}
              id="registerPassword"
              type="password"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="passwordConfirm">Confirm Password</Label>
            <Input
              onChange={(event) => this.setState({passwordConfirm: event.target.value})}
              value={this.state.passwordConfirm}
              id="passwordConfirm"
              type="password"
            ></Input>
          </FormGroup>
        </Form>
      </div>
    </ModalBody>
    <ModalFooter className="modalFooter">
      <Button form="registerForm" id="modalSubmitButton" type="submit">
        Create Account
      </Button>{" "}
    </ModalFooter>
  </Modal>
</div>
    )
}
}

export default HandleSubmit;