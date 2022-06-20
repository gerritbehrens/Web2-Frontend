import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

import { bindActionCreators } from "redux";
import * as editUserActions from "../actions/EditUserActions";

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
        this.handleShowEditDialog = this.handleShowEditDialog.bind(this)
        this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleShowEditDialog(e){
        e.preventDefault()
        const { showEditUserDialogAction } = this.props
        showEditUserDialogAction()
    }


    handleChange(e) {
        const { name, value } = e.target
        this.setState( { [name]: value } )
    }


    handleCloseEditDialog() {
        const { hideEditUserDialogAction } = this.props
        hideEditUserDialogAction()
    }
    handleSubmit(e){
        e.preventDefault()
        const userID = document.querySelector("#UserIDInput").value
        const username = document.querySelector("#UserNameInput").value
        const password = document.querySelector("#PasswordInput").value
        const isAdmin = document.querySelector("#isAdministratorInput")
        const isAdministrator = !!isAdmin.checked;

        const {updateUser} = this.props
        const token = this.props.accessToken

        console.log(userID+ " - " + username + " - " + password + " - " + isAdministrator)
        updateUser(userID, username, password, isAdministrator, token)
    }

    render() {

        let showEditDialog = this.props.showUserEditDialog;
        if (showEditDialog === undefined) {
            showEditDialog = false
        }

        const error = this.state.error
        let errorWhileUpdate

        if(error){
            errorWhileUpdate = <p className="text-danger">Something went wrong!</p>
        }

        return (
            <div>
                <Button id={"EditButton" + this.props.value1} variant="outline-dark" onClick={this.handleShowEditDialog}>Edit</Button>

                <Modal show={showEditDialog} onHide={this.handleCloseEditDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>UserID</Form.Label>
                                <Form.Control id="UserIDInput" type="text" value={this.props.value1} name="userIDEdit" disabled={true}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control id="UserNameInput" type="text" value={this.props.value2} name="userNameEdit" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="PasswordInput" type="password" placeholder="Password" name="passwordEdit" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="form-check-label">Administrator</Form.Label>
                                <Form.Control id="isAdministratorInput" className="form-check-input" type="checkbox" defaultChecked={this.props.value3} name="isAdministratorEdit" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                {errorWhileUpdate}
                                <Button id="SaveUserButton" variant="secondary" type="submit" onClick={this.handleSubmit}>
                                    Save
                                </Button>

                                <Button id="SaveUserButton" className="m-sm-1" variant="outline-danger" type="submit" onClick={this.handleSubmit}>
                                    Cancel
                                </Button>
                            </Form.Group>


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
    showEditUserDialogAction: editUserActions.getShowEditUserDialogAction,
    hideEditUserDialogAction: editUserActions.getHideEditUserDialogAction,
    updateUser: editUserActions.updateUser
}, dispatch)

const ConnectedEditDialog = connect(mapStateToProps, mapDispatchToProps)(EditUserDialog)

export default ConnectedEditDialog;