import React from 'react';
import {
  Col,
  Container, Card, CardBody, CardHeader, CardFooter, Button, Modal, ModalBody
} from "reactstrap";
import PackList from './PackList';
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
    packListItems: Array<object>
}

class MySites extends React.Component<AcceptProps, SearchState>{ 
  constructor(props: AcceptProps){
      super(props);
      this.updateOn = this.updateOn.bind(this);
      this.editUpdateSite = this.editUpdateSite.bind(this);
      this.updateOff = this.updateOff.bind(this);
      this.deleteTrip = this.deleteTrip.bind(this);
      this.addPackItem = this.addPackItem.bind(this);
      this.fetchPackList = this.fetchPackList.bind(this);
      this.state ={
          userTrips: [],
          updateActive: false,
          tripToUpdate: {},
          packItem: '',
          packListItems: []
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

  addPackItem = (siteId: number, item: string) => {
    let tripId: number = siteId;
    let packItem = item;
    let userName = this.props.user

    fetch(`http://localhost:4000/packList/newPackList`, {
        method: "POST",
        headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token
          }),
        body: JSON.stringify({
          packList: {
            tripId, 
            packItem, 
          }, user: {userName}},
        )
        }).then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error.message);
          } else{
              alert("Item Saved!")
              this.fetchPackList(tripId);
              //TODO: add toast
          }
        });
        
  }

  fetchPackList = (trip: number) => {
    let tripId = trip;
    if(this.props.token){
      fetch(`http://localhost:4000/packList/getList/${tripId}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.token,
        }),
      })
        .then((response) => response.json())
        .then((body) => this.setState({packListItems: body}))
        .catch((error) => console.log(error));
    }
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

  handleChange(event:any){
    this.setState({packItem: event.target.value})
  }

  
  componentDidMount(){
    this.fetchAllSites();
    console.log(this.props.token)
    }


//   const { addToast } = useToasts();
 
render(){
  return (
    <div>
      <div id="siteCards">
        <Container>
          <Col>
            {console.log(this.state.userTrips.length, this.state.userTrips)}
             {this.state.userTrips.length ? (
              this.state.userTrips.map((site: any, index) => {
                return <Card className="tripCard" key={index}>
                    <CardHeader className="cardHeader">
                      <b>{site.campsiteName}</b>
                    </CardHeader>
                    <CardBody className="cardBody">
                        <p>{site.siteDescription}</p>
              <p>{site.nites ? <b>{`Reserve for ${site.nites} nights`}</b> : <Button>How many nights?</Button>}</p>
              <Col>
              <table>
                <thead>Pack List</thead>
                  <tr>
                    <th>Item</th>
                    <th>Who</th>
                  </tr>
                  {this.state.packListItems.length > 0 ? <PackList packList={this.state.packListItems} getItems={this.fetchPackList} token={this.props.token}/> : this.fetchPackList(site.id)}
                  <tr>
                    <input type="text" id="newItem" placeholder="Add new pack item" value={this.state.packItem} onChange={this.handleChange.bind(this)}/>
                    <Button color="success" onClick={() => this.addPackItem(site.id, this.state.packItem )}> + </Button>
                  </tr>
              </table>
          </Col>
                    </CardBody>
                    <CardFooter className="cardFooter">
                      <Col id="updateCol" md="6">
                        <Button
                          onClick={() => {
                            this.editUpdateSite(site);
                            this.updateOn();
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col id="deleteCol" md="6">
                        <Button
                          onClick={() => {
                            this.deleteTrip(site);
                          }}
                        >
                          Delete
                        </Button>
                      </Col>
                    </CardFooter>
                  </Card>
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