import {Component} from "react";
import * as DeleteActions from "../actions/DeleteUserAction"
import { connect } from "react-redux"
import {Button, Modal, Form} from "react-bootstrap";
import React from "react";

const mapStateToProps = (state) =>{
    return {
        error: state.error,
        userToDelete: state.userToDelete,
        deletePending: state.deletePending,
        showUserDeleteDialog: state.showUserDeleteDialog,
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deletePending: () => {
            dispatch(
                DeleteActions.getDeleteUserPendingAction()
            )
        },
        deleteShow: (userID) => {
            dispatch(
                DeleteActions.getDeleteUserShowAction(userID)
            )
        },
        deleteHide: () => {
            dispatch(
                DeleteActions.getDeleteUserHideAction()
            )
        },
        deleteUser: (userID, token) => {
            dispatch(
                DeleteActions.deleteUser(userID, token)
            )
        }
    }
}

class DeleteUserDialog extends Component{

    constructor(props) {
        super(props)
    this.handleShowDelete = this.handleShowDelete.bind(this)
    this.handleCloseDelete = this.handleCloseDelete.bind(this)
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this)
}

    handleShowDelete(e){
        e.preventDefault()
        this.props.deleteShow(this.props.user.userID)
    }

    handleCloseDelete() {
        this.props.deleteHide()
    }

    handleSubmitDelete(e){
        e.preventDefault()
        const {deleteUser} = this.props
        console.log(this.props)
        deleteUser(this.props.userToDelete, this.props.accessToken)
        this.handleCloseDelete();
    }

    render(){

        let showUserDeleteDialog = this.props.showUserDeleteDialog
        if(showUserDeleteDialog === undefined){
            showUserDeleteDialog = false
        }

        let userID = this.props.user.userID

        return(
                <div>
                    <Button id={"DeleteButton" + userID} variant="outline-danger" onClick={this.handleShowDelete}>Delete</Button>

                    <Modal align={"center"} show={showUserDeleteDialog} onHide={this.handleCloseDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete User</Modal.Title>
                        </Modal.Header>

                        <Modal.Body >
                            <Form>
                                <Form.Group>
                                    <p>Are you sure that you want to delete user with userID: <br/> </p>
                                    <p>{this.props.userToDelete}</p>
                                </Form.Group>
                                <Form.Group>
                                    <Button id="DeleteUserConfirm" onClick={this.handleSubmitDelete} variant="secondary">Confirm</Button>
                                    <Button id="DeleteUserCancel" onClick={this.handleCloseDelete} className="m-sm-1" variant="outline-danger">Cancel</Button>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            )

    }
}

const ConnectedDeleteUserDialog = connect(mapStateToProps, mapDispatchToProps)

export default ConnectedDeleteUserDialog(DeleteUserDialog)