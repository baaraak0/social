import React from 'react';
import { Modal } from 'react-bootstrap';


class ItemModal extends React.Component {

    render() {
        console.log(this.props.modalData);
        return (
            <div className="pinModalContainer">
                <Modal show={() => this.props.openModal()} onHide={() => this.props.openModal(null)} className="modalPopupDeleteCC" >
                    <Modal.Body>
                        <div>
                            <div className="deleteCCModalText">Are you sure you want the delete this CC?</div>
                            <div className="deleteAproveButton">Delete</div>
                            <div className="deleteCanleButton" onClick={() => this.props.openModal(null)}>Cancel</div>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}
 
export default ItemModal;