import React, { useState, useEffect, useRef } from "react";

class Amenities extends React.Component{
    
    someFunc(){
        console.log("Hello")
    }

    render(){
        return(
            <div>{this.someFunc}</div>
        )
    }
    
}

export default Amenities;