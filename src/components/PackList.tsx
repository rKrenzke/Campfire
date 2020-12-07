import React from 'react';
import {Button, Modal, ModalBody, Input, ModalHeader} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPenAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import APIURL from '../helpers/environment';
import '../styles/Sites.css';

type PackProps={
    packList: Array<object>;
    getItems: (trip:number) => void;
    token: string;
}

type PackState={
    editModal: boolean,
    itemToUpdate: string,
    tripId: number,
    itemId: number,
}

class PackList extends React.Component<PackProps, PackState>{
    constructor(props: PackProps){
        super(props);
        this.deletePackItem = this.deletePackItem.bind(this);
        this.editPackItem = this.editPackItem.bind(this);
        this.state={
            editModal: false,
            itemToUpdate: '',
            tripId: 0,
            itemId: 0
        }
    }
    
    deletePackItem = (item: any) => {
        fetch(`${APIURL}/packList/${item.id}`, {
            method: "DELETE",
            headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.token,
              }),
            }).then(() => this.props.getItems(item.tripId));
      }

    editPackItem = (item:any) =>{
        this.setState({itemToUpdate: item.packItem});
        this.setState({editModal: true});
        this.setState({tripId: item.tripId});
        this.setState({itemId: item.id})
    }

    updatePackItem = () => {
        let newItem = this.state.itemToUpdate;
        fetch(`${APIURL}/packList/${this.state.itemId}`, {
        method: "PUT",
        headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token
          }),
        body: JSON.stringify({
          packList: {
            newItem 
          }},
        )
        }).then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error.message);
          }else{
            this.props.getItems(this.state.tripId);
            this.setState({editModal: false})
                //TODO: add toast
          }
        });
    }

    render(){
        return(
            this.props.packList.map((item: any, index) => {
                return <tr key={index} id="packRow">
                    <td>{item.packItem}</td>
                    <td>{item.who}</td>
                    <div id="packListButtons">
                    <Button id="editPack" onClick={() => this.editPackItem(item)}><FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon></Button>
                    <Button id="deletePack" onClick={() => this.deletePackItem(item)}><FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon></Button>
                    </div>
                    <div>
                        <Modal isOpen={this.state.editModal}>
                            <ModalHeader id="modalHeader">
                                <button type="button" className="close" onClick={() => this.setState({editModal: false})}>&times;</button>
                                <h5 id="mainTitle">Edit Pack Item</h5>
                            </ModalHeader>
                            <ModalBody>
                                <Input name="itemToEdit" type="text" placeholder={this.state.itemToUpdate} onChange={(e) => this.setState({itemToUpdate: e.target.value})}/>
                                <Button id="modalSubmitButton" onClick={() => this.updatePackItem()}>Save</Button>
                            </ModalBody>
                        </Modal>
                    </div>
                </tr>
              }))
            }            
}

export default PackList;