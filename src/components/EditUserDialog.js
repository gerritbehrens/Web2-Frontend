import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

import { bindActionCreators } from "redux";
import * as editUserActions from "../actions/EditUserActions";
import {getHideEditUserDialogAction, getShowEditUserDialogAction, updateUser} from "../actions/EditUserActions";

const mapStateToProps = state => {
    return state
}

class EditUserDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            password: ''
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleShow(e){
        e.preventDefault()
        const { getShowEditUserDialogAction } = this.props
        getShowEditUserDialogAction()
    }

    handleClose() {
        const { getHideEditUserDialogAction } = this.props
        getHideEditUserDialogAction()
    }
    //
    // handleChange(e) {
    //     const { name, value } = e.target
    //     this.setState( { [name]: value } )
    // }
    //
    handleSubmit(e){
        e.preventDefault()
        const userID = document.querySelector("#UserIDInput").value
        const username = document.querySelector("#UserNameInput").value
        const password = document.querySelector("#PasswordInput").value
        const isAdmin = document.querySelector("#isAdministratorInput")
        const isAdministrator = !!isAdmin.checked;

        const {createUser} = this.props
        const token = this.props.accessToken

        console.log(userID+ " - " + username + " - " + password + " - " + isAdministrator)
        createUser(userID, username, password, isAdministrator, token)
    }

    render() {

        let showDialog = this.props.showUserDialog;
        if (showDialog === undefined) {
            showDialog = false
        }

        const error = this.state.error
        let buttonState
        let errorWhileUpdate

        buttonState = <Button id={"UserItem" + this.props.userID} variant="outline-dark" onClick={this.handleShow}>Bearbeiten</Button>

        if(error){
            errorWhileUpdate = <p className="text-danger">Something went wrong!</p>
        }

        return (
            <div>
                {buttonState}

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>UserID</Form.Label>
                                <Form.Control id="UserIDInput" type="text" placeholder="User ID" name="userID" disabled="true"/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control id="UserNameInput" type="text" placeholder="Username" name="userName" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="PasswordInput" type="password" placeholder="Password" name="password" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="form-check-label">Administrator</Form.Label>
                                <Form.Control id="isAdministratorInput" className="form-check-input" type="checkbox" placeholder="isAdministrator" name="isAdministrator" />
                            </Form.Group>
                            {errorWhileUpdate}
                            <Button id="CreateUserButton" variant="secondary" type="submit" onClick={this.handleSubmit}>
                                Change
                            </Button>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        Forgot password?
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showUserDialogAction: editUserActions.getShowEditUserDialogAction,
    hideUserDialogAction: editUserActions.getHideEditUserDialogAction,
    createUser: editUserActions.updateUser
}, dispatch)

const ConnectedEditDialog = connect(mapStateToProps, mapDispatchToProps)(EditUserDialog)

export default ConnectedEditDialog;