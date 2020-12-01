import { error } from 'console';
import React from 'react';
import { ModalBody, Modal, ModalFooter, Button } from 'reactstrap';

type AcceptedProps={
    modalOpen: boolean,
    parkCode: string,
    closeModal: () => void
}

type ExtrasState={
    activities: any;
}

const api_key = process.env.REACT_APP_API_KEY;

class Extras extends React.Component<AcceptedProps, ExtrasState>{
    constructor(props: AcceptedProps){
        super(props);
        this.getActivities = this.getActivities.bind(this);
        this.state= {
            activities: []
        }  
    }

    componentWillMount(){
        this.getActivities();
    }

    setActivities(json: any){
        this.setState({activities: json})
    }

    getActivities(){
        // console.log(this.props.parkCode);
        let parkCode: string = this.props.parkCode;
        let url: string = `https://developer.nps.gov/api/v1/thingstodo?parkCode=${parkCode}&stateCode=MI&limit=10&api_key=${api_key}`;
                    
        fetch(url)
        .then(result => {return result.json()})
        .then(json => this.setActivities(json))
        .catch((error) => console.log(error))

    };

    render(){
        {console.log(this.state.activities)}
        return (
            <Modal isOpen={this.props.modalOpen}>
                <ModalBody>
                    {/* {this.state.activities.activities[0].name} */}
                    {/* {this.state.activities ? this.state.activities.map((act: any) => {
                        return (
                            <div>{act.activities[0].name}</div>
                        )
                    }) : <></>} */}
                    {this.state.activities ? <p>Hello from the Things To Do Modal {this.props.parkCode}</p> : <p>Activities not loaded</p>}
                </ModalBody>
                <ModalFooter>
                    <Button onclick={() => this.props.closeModal()}>Done</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

export default Extras;