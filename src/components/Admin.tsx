import userEvent from '@testing-library/user-event';
import React from 'react';
import {Button} from 'reactstrap';
import APIURL from '../helpers/environment';

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

    // componentDidMount(){
    //     this.fetchAllUsers();
    //     console.log(this.props.isAdmin)
    // }

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
            <div id="manageUsersTable">
                <thead>
                    User Management Options
                </thead>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Admin Privileges</th>
                        <th>Modify Privileges</th>
                        <th>Delete User</th>
                    </tr>
                    {this.state.allUsers.length > 0 ? this.state.allUsers.map((user: any) => {
                        return <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin == true ? "Yes" : "No"}</td>
                                <td><Button color="info" onClick={() => this.modifyAdminStatus(user)}>Modify</Button></td>
                                <td><Button color="danger" onClick={() => this.deleteUserFunction(user)}>X</Button></td>
                            </tr>
                    }) : this.fetchAllUsers()}
                </tbody>
            </div>
            
        )
    }
    
}

export default Admin;