import React from 'react';
import {Button, Table, Container} from 'reactstrap';
import APIURL from '../helpers/environment';
import "../styles/Admin.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserSlash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'

type Props={
    isAdmin: boolean;
    token: string;
}

type AdminState={
    admin: boolean;
    allUsers: any
}

class Admin extends React.Component<Props, AdminState>{
    constructor(props: Props){
        super(props);
        this.modifyAdminStatus = this.modifyAdminStatus.bind(this);
        this.deleteUserFunction = this.deleteUserFunction.bind(this);
        this.state={
            admin: true,
            allUsers: []
        }
    }

    fetchAllUsers(){
        fetch(`${APIURL}/user/admin`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.token,
            }),
          })
            .then((response) => response.json())
            .then((body) => this.setState({allUsers: body}))
            .catch((error) => console.log(error));
    }

    modifyAdminStatus(user: any){
        fetch(`${APIURL}/user/admin/${user.id}`, {
            method: "PUT", 
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.token,
            })
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
            this.fetchAllUsers();
    }
    

    deleteUserFunction(user: any){
        fetch(`${APIURL}/user/admin/${user.id}`, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.token,
            })
          })
          .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
            this.fetchAllUsers();
    }
    

    render(){
        return(
            <div className="adminDiv">
            <Container>
            <div id="manageUsersTable">
                <Table>
                    <h4 id="tableTitle">User Management Options</h4>                 
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th className="alignCenter">Admin Privileges</th>
                        <th className="alignCenter">Modify Privileges</th>
                        <th className="alignCenter">Delete User</th>
                    </tr>
                    {this.state.allUsers.length > 0 ? this.state.allUsers.map((user: any) => {
                        return <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td id="privileges">{user.isAdmin == true ? <text className="check">&#10003;</text>: <text className="x">&times;</text>}</td>
                                <td className="alignCenter"><Button color="info" onClick={() => this.modifyAdminStatus(user)}><FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon></Button></td>
                                <td className="alignCenter"><Button color="danger" onClick={() => this.deleteUserFunction(user)}><FontAwesomeIcon icon={faUserSlash}></FontAwesomeIcon></Button></td>
                            </tr>
                    }) : this.fetchAllUsers()}
                </tbody>
                </Table>
            </div>
                </Container>
            </div>
        )
    }
    
}

export default Admin;