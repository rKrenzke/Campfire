import React from 'react';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPenAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

type PackProps={
    packList: Array<object>;
    getItems: (trip:number) => void;
    token: string;
}

class PackList extends React.Component<PackProps, {}>{
    constructor(props: PackProps){
        super(props);
        this.deletePackItem = this.deletePackItem.bind(this);
        this.editPackItem = this.editPackItem.bind(this);
    }
    
    deletePackItem = (item: any) => {
        fetch(`http://localhost:4000/packList/${item.id}`, {
            method: "DELETE",
            headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.token,
              }),
            }).then(() => this.props.getItems(item.tripId));
      }

    editPackItem(){

    }

    render(){
        {console.log(this.props.packList)}
        return(
            this.props.packList.map((item: any, index) => {
                return <tr>
                    <td>{item.packItem}</td>
                    <td>{item.who}</td>
                    <div id="packListButtons">
                    <Button color="info" onClick={() => this.editPackItem}><FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon></Button>
                    <Button color="danger" onClick={() => this.deletePackItem(item)}><FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon></Button>
                    </div>
                </tr>
              }))
            }            
}

export default PackList;