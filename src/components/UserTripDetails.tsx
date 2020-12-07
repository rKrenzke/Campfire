import React, { Component } from 'react';
import {Card, CardFooter, Col, Input, CardHeader, CardBody, Form, Button} from 'reactstrap';
import PackList from './PackList';
import APIURL from '../helpers/environment';
import '../styles/Sites.css';

type AcceptedProps ={
    site: any,
    index: number,
    deleteTrip: (tripId: number) => void,
    token: string
    fetchAllSites: () => void 
}

type TripState ={
    packList: string,
    packItem: string,
    campRes: boolean,
    recPass: boolean,
    fireRes: boolean,
    rustic: boolean,
    packListItems: Array<object>
}

class UserTripDetails extends Component<AcceptedProps, TripState>{
    constructor(props: AcceptedProps){
        super(props);
        this.updateTripInfo = this.updateTripInfo.bind(this);
        this.addPackItem = this.addPackItem.bind(this);
        this.state={
            packList: '',
            packItem: '',
            campRes: false,
            recPass: false,
            fireRes: false,
            rustic: false,
            packListItems: []
        }
    }

    fetchPackList = (trip: number) => {
        let tripId = trip;
        if(this.props.token){
          fetch(`${APIURL}/packList/getList/${tripId}`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.token,
            }),
          })
            .then((response) => response.json())
            .then((body) => {
              if(body.length > 0){
                this.setState({packListItems: body})
              }
            })
            .catch((error) => console.log(error));
        }
      }

      addPackItem = (siteId: number, item: string) => {
        let tripId: number = siteId;
        let packItem = item;
        // let userName = this.props.user
    
        fetch(`${APIURL}/packList/newPackList`, {
            method: "POST",
            headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.token
              }),
            body: JSON.stringify({
              packList: {
                tripId, 
                packItem, 
              }, user: {userName: "MountainGoat220"}},
            )
            }).then((response) => response.json())
            .then((data) => {
              if (data.error) {
                console.log(data.error.message);
              } else{
                  this.fetchPackList(tripId);
                  //TODO: add toast
              }
            });
            
      }

      updateTripInfo = (tripId: number) => {
        let campsiteReserved = this.state.campRes;
        let recreationPassport = this.state.recPass;
        let fireRestrictions = this.state.fireRes;
        let rusticSite = this.state.rustic;
    
        fetch(`${APIURL}/tripList/${tripId}`, {
            method: "PUT",
            headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.token,
              }),
            body: JSON.stringify({trip: {
                  campsiteReserved,
                  recreationPassport,
                  fireRestrictions,
                  rusticSite
                }
            }),
            }).then(() => this.props.fetchAllSites());
      }

    
  handleChange(event:any){
    this.setState({packItem: event.target.value})
  }
    render(){
        return(
            <Card id="tripCards" className="tripCard border-0" key={this.props.index}>
                    <CardHeader className="cardHeader">
                      <b>{this.props.site.campsiteName}</b>
                    </CardHeader>
                    <CardBody className="cardBody">
                        <p>{this.props.site.siteDescription}</p>
                        <hr/>
                        <div className="row">
                        <Col className="col align-self-start">
                          <Form>
                            <h6>Fee Calculator</h6>
                            <Input type="number" placeholder="Site fee per night"></Input>
                            <Input type="number" placeholder="# of campers"></Input>
                            <Input type="number" placeholder="# of nights"></Input>
                          </Form>
                          <hr/>
                          <div className="input-group mb-3">
                            <div className="input-group=prepend">
                              <div className="input-group-text">
                                <input type="checkbox" checked={this.props.site.campsiteReserved ? true : false} aria-label="reservation" value="reservation" onChange={() => this.setState({campRes: true})}/>
                              </div>
                            </div>
                            <label htmlFor="reservation">Campsite reserved</label>
                          </div>
                          <div className="input-group mb-3">
                            <div className="input-group=prepend">
                              <div className="input-group-text">
                                <input type="checkbox" checked={this.props.site.recreationPassport ? true : false} aria-label="recPassport" value="recPassport" onChange={()=>this.setState({recPass: true})}/>
                              </div>
                            </div>
                            <label htmlFor="recPassport">Recreation Passport <i>(State parks only)</i></label>
                          </div>
                          <div className="input-group mb-3">
                            <div className="input-group=prepend">
                              <div className="input-group-text">
                                <input type="checkbox" checked={this.props.site.fireRestriction ? true : false} aria-label="reservation" value="reservation" onChange={()=>this.setState({fireRes: true})}/>
                              </div>
                            </div>
                            <label htmlFor="reservation">Fire restrictions</label>
                          </div>
                          <div className="input-group mb-3">
                            <div className="input-group=prepend">
                              <div className="input-group-text">
                                <input type="checkbox" checked={this.props.site.rusticSite ? true : false} aria-label="rustic" value="rustic" onChange={()=>this.setState({rustic: true})}/>
                              </div>
                            </div>
                            <label htmlFor="rustic">Rustic site</label>
                          </div>
                          <Button onClick={() => this.updateTripInfo(this.props.site.id)}>Save Changes</Button>
                        </Col>
                        <Col className="col align-self-end">
                          <table>
                            <thead>Pack List</thead>
                              <tr>
                                <th>Item</th>
                                <th>Who</th>
                              </tr>
                              {this.state.packListItems.length > 0 ? <PackList packList={this.state.packListItems} getItems={this.fetchPackList} token={this.props.token}/> : this.fetchPackList(this.props.site.id)}
                              <tr>
                                <input type="text" id="newItem" placeholder="Add new pack item" value={this.state.packItem} onChange={this.handleChange.bind(this)}/>
                                <Button color="success" onClick={() => this.addPackItem(this.props.site.id, this.state.packItem )}> + </Button>
                              </tr>
                          </table>
                        </Col>
                        </div>
                    </CardBody>
                    <CardFooter className="cardFooter">
                      <Col id="deleteCol" md="6">
                        <Button
                          onClick={() => {
                            this.props.deleteTrip(this.props.site);
                          }}
                        >
                          Delete
                        </Button>
                      </Col>
                    </CardFooter>
                  </Card>
        )
    }
}

export default UserTripDetails;