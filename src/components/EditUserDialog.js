import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

import { bindActionCreators } from "redux";
import * as EditUserActions from "../actions/EditUserActions";
import * as UserActions from "../actions/UserActions";

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken,
        error: state.error,
        }
}

class EditUserDialog extends Component {

    initialState = {
        userID: "",
        userName: "",
        password: "",
        isAdministrator: false,
        showDialog: false,
    }

    constructor(props) {
        super(props)
        this.state = this.initialState
        this.handleShowEditDialog = this.handleShowEditDialog.bind(this)
        this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        if(this.props.user){
            this.setState(this.props.user)
        }
    }

    handleShowEditDialog(e){
        e.preventDefault()
        this.setState({showDialog: true})
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState( { [name]: value } )
    }


    handleCloseEditDialog() {
        this.setState({showDialog: false})
    }

    handleSubmit(e){
        e.preventDefault()
        const userID = document.querySelector("#UserIDInput").value
        const username = document.querySelector("#UserNameInput").value
        const password = document.querySelector("#PasswordInput").value
        const isAdmin = document.querySelector("#isAdministratorInput")
        const isAdministrator = !!isAdmin.checked;

        const token = this.props.accessToken

        console.log(userID+ " - " + username + " - " + password + " - " + isAdministrator)
        this.props.updateUser(userID, username, password, isAdministrator, token)
        if(this.props.error == null){
            this.handleCloseEditDialog()
        }
    }

    render() {

        let showUserEditDialog = this.state.showDialog;
        if (showUserEditDialog === undefined) {
            console.log("Set showEditUserDialog -> false")
            showUserEditDialog = false
        }

        const error = this.props.error
        let errorWhileUpdate

        let userID = this.state.userID
        let username = this.state.userName
        let isAdministrator = this.state.isAdministrator

        if(error){
            errorWhileUpdate = <p className="text-danger">Something went wrong while updating!</p>
        }

        return (
            <div>

                <Button id={"EditButton" + userID} variant="outline-dark" onClick={this.handleShowEditDialog}>
                    <i className="fa-solid fa-user-pen"/>
                    Edit
                </Button>

                <Modal show={showUserEditDialog} onHide={this.handleCloseEditDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>UserID</Form.Label>
                                <Form.Control id="UserIDInput" type="text" defaultValue={userID} name="userID" disabled={true}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control id="UserNameInput" type="text" defaultValue={username} name="userName" onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="PasswordInput" type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="form-check-label">Administrator</Form.Label>
                                <Form.Check id="isAdministratorInput" type="checkbox" defaultChecked={isAdministrator} name="isAdministrator" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                {errorWhileUpdate}
                                <Button id="SaveUserButton" variant="secondary" type="submit" onClick={this.handleSubmit}>
                                    Save
                                </Button>

                                <Button id="CancelEditUserButton" className="m-sm-1" variant="outline-danger" onClick={this.handleCloseEditDialog}>
                                    Cancel
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    updateUser: EditUserActions.updateUser,
    getAllUsers: (token) => {
        dispatch(
            UserActions.getAllUsers(token)
        )

    },
    updateFinished: UserActions.updateUserManagementActionFinished()
}, dispatch)

const ConnectedEditDialog = connect(mapStateToProps, mapDispatchToProps)(EditUserDialog)

export default ConnectedEditDialog;