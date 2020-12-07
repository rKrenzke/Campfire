import React from 'react';
import {Container, Button, Col, CardImg, Card, CardBody, CardHeader, Row, CardFooter} from 'reactstrap';
import '../styles/Search.css';
import NotFound from '../assets/imageNotFound.png';
import APIURL from '../helpers/environment';
import Extras from './Extras';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFire, faMapPin, faShower, faSignal, faTint, faToilet} from '@fortawesome/free-solid-svg-icons'


type AcceptProps ={
    token: string;
}

type SearchState = {
    pageNumber: number,
    allSites: any,
    oneSiteInfo: any,
    extrasModal: boolean,
    parkCode: string
}
const api_key = process.env.REACT_APP_API_KEY;

class Search extends React.Component<AcceptProps, SearchState>{
    constructor(props: AcceptProps){
        super(props);
        this.getSites = this.getSites.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.createNewTrip = this.createNewTrip.bind(this);
        // this.extrasModal = this.extrasModal.bind(this);
        this.closeExtrasModal= this.closeExtrasModal.bind(this);
        this.state ={
            pageNumber: 1,
            allSites: null,
            oneSiteInfo: null,
            extrasModal: false,
            parkCode: ""
        }
    }

    componentDidMount(){
        this.getSites();
    }
    
    getSites = () => {
        const baseURL: string = 'https://developer.nps.gov/api/v1/campgrounds?stateCode=MI';
        let url: string = baseURL + `&start=${this.state.pageNumber}&limit=3&api_key=${api_key}`;
                    
        fetch(url)
        .then(result => {return result.json()})
        .then(json => {this.setState({allSites: json})})
    };

    nextPage(){
        this.setState({pageNumber: this.state.pageNumber + 3});
        this.getSites();
    }

    previousPage(){
        this.setState({pageNumber: this.state.pageNumber - 3});
        this.getSites();
    }

    extrasModal(parkCode: string){
        this.setState({parkCode: parkCode});
        this.setState({extrasModal: true});
    }

    closeExtrasModal(){
        this.setState({extrasModal: false})
    }

    createNewTrip(site: any){
        let token = this.props.token;
        let campsiteName = site.name;
        let siteDescription = site.description ? site.description : null;
        let totalSites = site.campsites.totalSites ? site.campsites.totalSites : null;
        let contactEmail = site.contacts.emailAddresses[0].emailAddress ? site.contacts.emailAddresses[0].emailAddress : null;
        // let contactPhone = site.contacts.phoneNumbers[0].phoneNumber ? site.contacts.phoneNumbers[0].phoneNumber : null;
        let siteAddress = site.addresses[0].city && site.addresses[0].line1 ? site.addresses[0].city + site.addresses[0].line1 : null;
        let operatingHours = site.operatingHours[0].description ? site.operatingHours[0].description: null;
        let reservationUrl = site.url ? site.url: null;
        let nights = null;
        let costPerNight = site.fees.length > 0 ? site.fees[0].cost: null;
        let siteImage = null;
       
        // console.log(site);
        fetch(`${APIURL}/tripList/new`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
            body: JSON.stringify({ 
                trip: {
                campsiteName,
                siteDescription,
                totalSites,
                contactEmail,
                // contactPhone,
                siteAddress,
                operatingHours,
                reservationUrl,
                nights,
                costPerNight,
                siteImage,
                }
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                alert("Something went wrong, trip not saved");
              } else{
                  alert("Trip Saved!")
                  //TODO: add toast
                  console.log("Trip Saved!")
              }
            });
        }
    
    render(){
        return(
            <div id="mainDiv">
                <div id="resultsBody">
                {console.log(this.state.allSites)}
                {this.state.allSites ? this.state.allSites.data.map((site: any, index: any) =>{ 
                    return <Container id="siteResults">
                    <Card className="border-0">
                        <CardHeader id="cardHeader">
                            <th>{`${site.name} - ${site.addresses[0].city}`}</th>
                        </CardHeader>
                        <CardBody>
                            <Row>                          
                            <Col className="col-md-3">
                                <div id="mainImage">
                                    {site.images.length === 0 ? <img src={NotFound} className="img-fluid" alt="imageNotFound"/> : <img id="siteImage" src={site.images[0].url} className="img-fluid" alt="Campsite"/>}
                                </div>
                            </Col>
                            <Col className="col-md-4">
                            <p>{site.description ? site.description : "Site description not available"}</p>
                                <tr><a href={site.url} target="blank">Things to Do at {site.name} </a></tr>
                            </Col>
                            <Col className="col-md-5">                                                           
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Open Dates</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>                                                               
                                        <td>{site.operatingHours.length > 0 ? site.operatingHours[0].description : "Contact for operating hours"}</td>
                                    </tr>
                                    <hr/>
                                    <div>
                                    <th>Amenities:</th>
                                    <div id="amenitiesIcons">
                                    {site.amenities.cellPhoneReception == "No" ? <div id="noSignal" title="No cellphone signal"><FontAwesomeIcon icon={faSignal}></FontAwesomeIcon></div> : <div id="signal" title="Cellphone signal available"><FontAwesomeIcon icon={faSignal}></FontAwesomeIcon></div>}
                                    {site.amenities.firewoodForSale == "No" ? <div id="noFirewood" title="No firewood for sale"><FontAwesomeIcon icon={faFire}></FontAwesomeIcon></div> : <div id="fire" title="Firewood for sale"><FontAwesomeIcon icon={faFire}></FontAwesomeIcon></div>}
                                    {site.amenities.potableWater[0] ? <div id="water" title="Potable water available"><FontAwesomeIcon icon={faTint}></FontAwesomeIcon></div> : <div id="noWater" title="No potable water"><FontAwesomeIcon icon={faTint}></FontAwesomeIcon></div>}
                                    {site.amenities.showers[0] == "None" ? <div id="noShower" title="No shower facilities"><FontAwesomeIcon icon={faShower}></FontAwesomeIcon></div> : <div id="shower" title="Shower facilities available"><FontAwesomeIcon icon={faShower}></FontAwesomeIcon></div>}
                                    {site.amenities.toilets[0] ? <div id="toilet" title="Toilets available"><FontAwesomeIcon icon={faToilet}></FontAwesomeIcon></div> : <div id="noToilet" title="No toilets available"><FontAwesomeIcon icon={faToilet}></FontAwesomeIcon></div>}                                   
                                        </div>
                                    </div>                                   
                                    <hr/>
                                </tbody>
                            </table>
                                    <tr>
                                        <td><b>Total Sites:</b> {site.campsites.totalSites ? site.campsites.totalSites : "Contact for available sites"}</td>
                                        <td className="moreInfoButtons">
                                            <div >
                                                {/* <Button onClick={() => this.extrasModal(site.parkCode)}>Things To Do</Button> */}
                                                {this.props.token ? <Button className="saveTripButton" onClick={() => this.createNewTrip(site)} value={site}>Save Campsite</Button> : <></> }              
                                            </div>
                                        </td>
                                    </tr>                            
                        </Col>
                    </Row>
                        </CardBody>
                    </Card>                   
                </Container>}) : <></>}
                    <Extras modalOpen={this.state.extrasModal} parkCode={this.state.parkCode} closeModal={this.closeExtrasModal}/>
                <div className="pageButtons">
                    {this.state.pageNumber == 1 ? <></> : <Button className="page" onClick={this.previousPage}><text>&#8592;</text> Last Sites </Button>}
                    <Button className="page" onClick={this.nextPage}>More Sites <text>&#8594;</text> </Button>
                </div>
                </div>
            </div>
        )
    }
}

export default Search;