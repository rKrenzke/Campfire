import React, { Component } from 'react';
import {Card, CardFooter, Col, Input, CardHeader, CardBody, Form, Button, Table} from 'reactstrap';
import PackList from './PackList';
import APIURL from '../helpers/environment';
import '../styles/Sites.css';

type AcceptedProps ={
    site: any,
    index: number,
    deleteTrip: (tripId: number) => void,
    token: string
    fetchAllSites: () => void,
    user: string
}

type TripState ={
    packList: string,
    packItem: string,
    campRes: boolean,
    recPass: boolean,
    fireRes: boolean,
    rustic: boolean,
    packListItems: Array<object>,
    costPerNight: any,
    campers: number,
    nightLength: number,
    totalFees: any
}

class UserTripDetails extends Component<AcceptedProps, TripState>{
    constructor(props: AcceptedProps){
        super(props);
        this.updateTripInfo = this.updateTripInfo.bind(this);
        this.addPackItem = this.addPackItem.bind(this);
        // this.handleFees = this.handleFees.bind(this);
        this.handleCampers = this.handleCampers.bind(this);
        this.handleNightLength = this.handleNightLength.bind(this);
        this.state={
            packList: '',
            packItem: '',
            campRes: false,
            recPass: false,
            fireRes: false,
            rustic: false,
            packListItems: [],
            costPerNight: "",
            campers: 0,
            nightLength: 0,
            totalFees:""
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
              }, user: {userName: this.props.user}},
            )
            }).then((response) => response.json())
            .then((data) => {
              if (data.error) {
                console.log(data.error.message);
              } else{
                  this.fetchPackList(tripId);
                  this.setState({packItem: ''});
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

  handleFees(event:any){
    console.log(event.target.value)
    this.setState({costPerNight: event.target.value})
  }

  handleCampers(event:any){
    this.setState({campers: event.target.value})
  }

  handleNightLength(event:any){
    this.setState({nightLength: event.target.value})
  }

  calculateFees(x: number, y: number, z: number){
    console.log(x);
    console.log(y);
    console.log(z);
    let total = (x * z) / y;
    this.setState({totalFees: total})
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
                            <h6 className="titleTag">Fee Calculator</h6>
                          <div className="input-group">
                            <input type="text" className="form-control" placeholder="$ per night" onChange={(event) => this.handleFees(event)}/>
                            <input type="text" className="form-control" placeholder="# of campers" onChange={(event) => this.handleCampers(event)}/>
                            <input type="text" className="form-control" placeholder="# of nights" onChange={(event) => this.handleNightLength(event)}/>
                            <div className="input-group-append">
                              <button className="btn btn-outline-secondary" type="button" onClick={() => this.calculateFees(this.state.costPerNight, this.state.campers, this.state.nightLength)}>Calculate</button>
                            </div>
                          </div>
                            {this.state.totalFees ? <p>${this.state.totalFees} per person</p> : <></>}
                          <hr/>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <input type="checkbox" checked={this.props.site.campsiteReserved ? true : false} aria-label="reservation" value="reservation" onChange={() => this.setState({campRes: true})}/>
                              </div>
                            </div>
                            <label id="label" htmlFor="reservation">Campsite reserved</label>
                          </div>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <input type="checkbox" checked={this.props.site.recreationPassport ? true : false} aria-label="recPassport" value="recPassport" onChange={()=>this.setState({recPass: true})}/>
                              </div>
                            </div>
                            <label id="label" htmlFor="recPassport">Recreation Passport <i>(State parks only)</i></label>
                          </div>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <input type="checkbox" checked={this.props.site.fireRestriction ? true : false} aria-label="reservation" value="reservation" onChange={()=>this.setState({fireRes: true})}/>
                              </div>
                            </div>
                            <label id="label" htmlFor="reservation">Fire restrictions</label>
                          </div>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <input type="checkbox" checked={this.props.site.rusticSite ? true : false} aria-label="rustic" value="rustic" onChange={()=>this.setState({rustic: true})}/>
                              </div>
                            </div>
                            <label id="label" htmlFor="rustic">Rustic site</label>
                          </div>
                          <Button id="saveChangesBtn" onClick={() => this.updateTripInfo(this.props.site.id)}>Save Changes</Button>
                        </Col>
                        <Col className="col align-top">
                          <Card id="packCard" className="border-0">
                            <CardHeader className="card text-center header">
                              <h4 className="titleTag">Pack List</h4>
                            </CardHeader>
                              <Table id="packTable">                               
                                {this.state.packListItems.length > 0 ? <PackList packList={this.state.packListItems} getItems={this.fetchPackList} token={this.props.token}/> : this.fetchPackList(this.props.site.id)}
                                <tr id="addButton">
                                </tr>
                              </Table>
                              <CardFooter>
                                  <input type="text" id="newItem" placeholder="Add new pack item" value={this.state.packItem} onChange={this.handleChange.bind(this)}/>
                                  <Button id="addPackItem" onClick={() => this.addPackItem(this.props.site.id, this.state.packItem )}> &#43; </Button>
                              </CardFooter>
                          </Card>
                        </Col>
                        </div>
                    </CardBody>
                    <CardFooter className="cardFooter">
                      <Col md="6">
                        <Button id="deleteTripButton"
                          onClick={() => {
                            this.props.deleteTrip(this.props.site);
                          }}
                        >
                          Delete This Campsite
                        </Button>
                      </Col>
                    </CardFooter>
                  </Card>
        )
    }
}

export default UserTripDetails;