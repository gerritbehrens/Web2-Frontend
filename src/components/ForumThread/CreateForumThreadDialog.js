import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

import { bindActionCreators } from "redux";
import * as ForumActions from "../../actions/ForumThread/CreateForumThreadActions";

const mapStateToProps = state => {
    return{
        error: state.error,
        accessToken: state.accessToken,
        createPending: state.createForumPending
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    createForum: ForumActions.createForum
}, dispatch)

class CreateForumThreadDialog extends Component {

    initialState = {
        ownerID: "",
        name: "",
        description: "",
        showDialog: false
    }

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    handleShow = (e) =>{
        e.preventDefault()
        this.setState({showDialog: true})
    }

    handleClose = () =>{
        this.setState({showDialog: false})
    }

    handleChange = (e) => {
        const{name, value} = e.target
        this.setState({ [name]: value } )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const name = document.querySelector("#ForumThreadNameInput").value
        const description = document.querySelector("#ForumThreadDescriptionInput").value
        const ownerID = this.props.userID

        const token = this.props.accessToken

        this.props.createForum(ownerID, name, description, token)
        if(this.props.error == null){
            this.handleClose()
        }
    }

    render() {
        let showUserDialog = this.state.showDialog;
        if(showUserDialog === undefined) {
            showUserDialog = false
        }

        const error = this.props.error
        let errorWhileCreating
        let buttonState
        let disabled = true
        if(this.props.accessToken) disabled = false

        buttonState = <Button id="OpenCreateForumThreadDialogButton" onClick={this.handleShow} className={"pt-2"} disabled={disabled} style={{background: "#00a0aa", border: "groove", borderColor: "lightgray",width: "100%", height: "90%"}}>
            <i className="fa-solid fa-plus"></i>
        </Button>

        if(error){
            errorWhileCreating = <p className={"text-danger"}>Something went wrong while creating!</p>
        }

        return (
            <div>
                {buttonState}

                <Modal show={showUserDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Forum</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control id="ForumThreadNameInput" type="text" placeholder="Title" name="title" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control id="ForumThreadDescriptionInput" type="text" placeholder="Short description" name="description" onChange={this.handleChange} />
                            </Form.Group>

                            {errorWhileCreating}
                            <Button id="CreateForumThreadButton" type="submit" onClick={this.handleSubmit} style={{background: "#333333", border: "#333333"}}>
                                Create
                            </Button>

                            <Button id="CancelCreateForumThreadButton" className={"m-sm-1"} variant={"outline-danger"} onClick={this.handleCloseEditDialog}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateForumThreadDialog)