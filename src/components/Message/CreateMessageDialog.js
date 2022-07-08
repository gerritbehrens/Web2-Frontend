import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

import { bindActionCreators } from "redux";
import * as MessageActions from "../../actions/Message/MessageActions";

const mapStateToProps = state => {
    return{
        error: state.error,
        accessToken: state.accessToken,
        createPending: state.createForumPending,
        forum: state.forum,
        userID: state.userID
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    createMessage: MessageActions.createMessage
}, dispatch)

class CreateMessageDialog extends Component {

    initialState = {
        title: "",
        text: "",
        authorID: "",
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
        const title = document.querySelector("#ForumMessageTitleInput").value
        const text = document.querySelector("#ForumMessageTextInput").value
        const authorID = this.props.userID

        const token = this.props.accessToken
        const forumID = this.props.forum._id

        this.props.createMessage(forumID, title, text, authorID, token)
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

        buttonState = <Button id="OpenCreateForumMessageDialogButton" onClick={this.handleShow} className={"pt-2"} style={{background: "#00a0aa", border: "groove", borderColor: "lightgray",width: "100%", height: "90%"}}>
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
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control id="ForumMessageTitleInput" type="text" placeholder="Title" name="title" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Text</Form.Label>
                                <textarea  id="ForumMessageTextInput" placeholder="Your text" name="description" onChange={this.handleChange} className={"form-control"}/>
                            </Form.Group>

                            {errorWhileCreating}
                            <Button id="CreateForumMessageButton" variant="secondary" type="submit" onClick={this.handleSubmit} style={{background: "#333333", border: "#333333"}}>
                                Create
                            </Button>

                            <Button id="CancelCreateForumMessageButton" className={"m-sm-1"} variant={"outline-danger"} onClick={this.handleCloseEditDialog}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageDialog)