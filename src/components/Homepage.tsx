import React from "react";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapPin} from '@fortawesome/free-solid-svg-icons'
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="mainDiv">
      <Container id="landingTitle">
        <h1 className="title"><span>MI</span>campfire</h1>
        <div className="navButtons">
        <Link to="/search"><Button>National Parks</Button></Link> {/*<FontAwesomeIcon icon={faMapPin}></FontAwesomeIcon>*/}
        <Button>State Parks</Button>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;