import {Component} from "react";
import * as DeleteActions from "../../actions/ForumThread/DeleteForumThreadActions"
import { connect } from "react-redux"
import {Button, Modal} from "react-bootstrap";
import React from "react";
import * as ForumActions from "../../actions/ForumThread/CreateForumThreadActions";

const mapStateToProps = (state) =>{
    return {
        error: state.error,
        forumToDelete: state.forumToDelete,
        deletePending: state.deleteForumPending,
        showForumDeleteDialog: state.showForumDeleteDialog,
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deletePending: () => {
            dispatch(
                DeleteActions.getDeleteForumPendingAction()
            )
        },
        deleteShow: (forumID) => {
            dispatch(
                DeleteActions.getDeleteForumShowAction(forumID)
            )
        },
        deleteHide: () => {
            dispatch(
                DeleteActions.getDeleteForumHideAction()
            )
        },
        deleteUser: (forumID, token) => {
            dispatch(
                DeleteActions.deleteForum(forumID, token)
            )
        }
    }
}

class DeleteForumThreadDialog extends Component{

    handleShowDelete = (e) =>{
        e.preventDefault()
        this.props.deleteShow(this.props.forum._id)
    }

    componentDidMount() {
        ForumActions.getAllForums()
    }

    handleCloseDelete = () => {
        this.props.deleteHide()
    }

    handleSubmitDelete = (e) => {
        e.preventDefault()
        this.props.deleteUser(this.props.forumToDelete, this.props.accessToken)
        if(this.props.error == null){
            this.handleCloseDelete();
        }
    }

    render(){
        let showForumDeleteDialog = this.props.showForumDeleteDialog
        if(showForumDeleteDialog === undefined){
            showForumDeleteDialog = false
        }

        let forumName = this.props.forum.name

        let disabled = true
        if(this.props.accessToken) disabled = false

        return(
            <div>
                <Button id={"DeleteForumThreadButton" + this.props.forum._id} variant={"danger"} onClick={this.handleShowDelete} disabled={disabled}>
                    <i className="fa-solid fa-trash-can"/>
                    Delete
                </Button>

                <Modal align={"center"} show={showForumDeleteDialog} onHide={this.handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Forum</Modal.Title>
                    </Modal.Header>

                    <Modal.Body >
                        <p>Are you sure that you want to delete the thread: <br/> </p>
                        <p>{forumName}</p>

                        <div className={"d-inline-flex gap-2"}>
                            <Button id="DeleteForumThreadConfirm" onClick={this.handleSubmitDelete} style={{background: "#333333", border: "#333333"}}>Confirm</Button>
                            <Button id="DeleteForumThreadCancel" onClick={this.handleCloseDelete} variant="outline-danger">Cancel</Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteForumThreadDialog)