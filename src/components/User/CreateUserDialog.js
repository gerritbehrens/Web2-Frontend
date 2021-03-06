import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

import { bindActionCreators } from "redux";
import * as userActions from "../../actions/User/UserActions";

const mapStateToProps = state => {
    return {
        error: state.error,
        accessToken: state.accessToken,
        showUserDialog: state.showUserDialog,
        createPending: state.createPending
    }
}

class CreateUserDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            password: ''
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleShow(e){
        e.preventDefault()
        const { showUserDialogAction } = this.props
        showUserDialogAction()
    }

    handleClose() {
        const { hideUserDialogAction } = this.props
        hideUserDialogAction()
    }

    //react will call this function if props change
        componentDidUpdate(prevProps) {
            //Backend call is ready without error
            if (prevProps.createPending !== this.props.createPending && !this.props.createPending && !this.props.error) {
                this.handleClose();
            }
        }

    handleSubmit(e){
         e.preventDefault()
         const userID = document.querySelector("#UserIDInput").value
         const username = document.querySelector("#UserNameInput").value
         const password = document.querySelector("#PasswordInput").value
         const isAdmin = document.querySelector("#isAdministratorInput")
         const isAdministrator = !!isAdmin.checked;

         const {createUser} = this.props
         const token = this.props.accessToken

         createUser(userID, username, password, isAdministrator, token)
    }

    render() {

        let showDialog = this.props.showUserDialog;
        if (showDialog === undefined) {
            showDialog = false
        }

        const error = this.props.error
        let buttonState
        let errorWhileCreating

        buttonState =   <Button id="OpenCreateUserDialogButton" onClick={this.handleShow} className={"pt-2"} style={{background: "#00a0aa", border: "groove", borderColor: "lightgray", width: "100%", height: "90%"}}>
                            <i className="fa-solid fa-plus"></i>
                        </Button>

        if(error){
            errorWhileCreating = <p className="text-danger">Something went wrong!</p>
        }

        return (
            <div>
                {buttonState}

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>UserID</Form.Label>
                                <Form.Control id="UserIDInput" type="text" placeholder="User ID" name="userID" className={"control-label"} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control id="UserNameInput" type="text" placeholder="Username" name="userName" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="PasswordInput" type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="form-check-label">Administrator</Form.Label>
                                <Form.Control id="isAdministratorInput" className="form-check-input" type="checkbox" placeholder="isAdministrator" name="isAdministrator" onChange={this.handleChange}/>
                            </Form.Group>
                            {errorWhileCreating}
                            <Button id="CreateUserButton" variant="secondary" type="submit" onClick={this.handleSubmit} style={{background: "#333333", border: "#333333"}}>
                                Create
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
    showUserDialogAction: userActions.getShowUserDialogAction,
    hideUserDialogAction: userActions.getHideUserDialogAction,
    createUser: userActions.createUser
}, dispatch)

const ConnectedUserDialog = connect(mapStateToProps, mapDispatchToProps)(CreateUserDialog)

export default ConnectedUserDialog;