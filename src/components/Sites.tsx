import React from 'react';
import {
  Col,
  Container, Card, CardBody, CardHeader, CardFooter, Button, Modal, ModalBody, Form, Input
} from "reactstrap";
import PackList from './PackList';
import UserTripDetails from './UserTripDetails';
// import { useToasts } from "react-toast-notifications";


type AcceptProps ={
    token: string;
    user: string
}

type SearchState = {
    userTrips: Array<object>,
    updateActive: boolean,
    tripToUpdate: object,
    packItem: string,
    packListItems: Array<object>,
    packListEmpty: boolean,
    
}

class MySites extends React.Component<AcceptProps, SearchState>{ 
  constructor(props: AcceptProps){
      super(props);
      this.updateOn = this.updateOn.bind(this);
      this.editUpdateSite = this.editUpdateSite.bind(this);
      this.updateOff = this.updateOff.bind(this);
      this.deleteTrip = this.deleteTrip.bind(this);
      this.state ={
          userTrips: [],
          updateActive: false,
          tripToUpdate: {},
          packItem: '',
          packListItems: [],
          packListEmpty: true,
          
      }
  }


  fetchAllSites = () => {
    if(this.props.token){
      fetch("http://localhost:4000/tripList/all", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.token,
        }),
      })
        .then((response) => response.json())
        .then((body) => this.setState({userTrips: body}))
        .catch((error) => console.log(error));
    }
    }

  deleteTrip = (trip:any) => {
    fetch(`http://localhost:4000/tripList/${trip.id}`, {
        method: "DELETE",
        headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
          }),
        }).then(() => this.fetchAllSites());
  }

  


  editUpdateSite = (trip: any) => {
    this.setState({tripToUpdate: trip});
  };

  updateOn = () => {
    this.setState({updateActive: true});
  };

  updateOff = () => {
    this.setState({updateActive: false});
  };

  
  componentDidMount(){
    this.fetchAllSites();
    console.log(this.props.token)
    }


//   const { addToast } = useToasts();
 
render(){
  {console.log(this.props.user)}
  return (
    <div>
      <div id="siteCards">
        <Container>
          <Col>
            {console.log(this.state.userTrips.length, this.state.userTrips)}
             {this.state.userTrips.length ? (
              this.state.userTrips.map((site: any, index) => {
                return <UserTripDetails site={site} index={index} token={this.props.token} deleteTrip={this.deleteTrip} fetchAllSites={this.fetchAllSites} />

              })
            ) : this.fetchAllSites()} 
          </Col>
         
          <Modal isOpen={this.state.updateActive}>
            <ModalBody>
                <h4>Edit Campsite</h4>
                <div id="deleteModalButtons">
                    <Button onClick={() => this.setState({updateActive: false})}>Done</Button>
                </div>
            </ModalBody>
        </Modal>
        </Container> 
      </div>
    </div>
  )
}

}

export default MySites;