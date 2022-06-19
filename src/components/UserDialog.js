import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

import * as authenticationActions from "../actions/AuthenticationsActions"
import { bindActionCreators } from "redux";
import * as userActions from "../actions/UserActions";


const mapStateToProps = state => {
    return state
}

class UserSessionWidget extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            password: ''
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
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
    //
    // handleChange(e) {
    //     const { name, value } = e.target
    //     this.setState( { [name]: value } )
    // }
    //
    // handleSubmit(e){
    //     e.preventDefault()
    //     const {userID, password} = this.state
    //     const {authenticateUserAction} = this.props
    //
    //     authenticateUserAction(userID, password)
    // }

    render() {

        let showDialog = this.props.showUserDialog;
        if (showDialog === undefined) {
            showDialog = false
        }

        let buttonState

        buttonState = <Button id="OpenCreateUserDialogButton" variant="warning" onClick={this.handleShow}>New User</Button>

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
                                <Form.Control id="UserIDInput" type="text" placeholder="User ID" name="userID" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control id="UserNameInput" type="text" placeholder="Username" name="userName" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="PasswordInput" type="passwort" placeholder="Password" name="password" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Administrator</Form.Label>
                                <Form.Control id="isAdministratorInput" type="text" placeholder="isAdministrator" name="isAdministrator" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="LoginPasswordInput" type="password" placeholder="Password" name='password' onChange={this.handleChange} />
                            </Form.Group>

                            <Button id="LoginButton" variant="secondary" type="submit" onClick={this.handleSubmit}>
                                Login
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
}, dispatch)

const ConnectedUserDialog = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserDialog;