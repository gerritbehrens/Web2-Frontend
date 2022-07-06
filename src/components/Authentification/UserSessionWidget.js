import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

import * as authenticationActions from "../../actions/Authentification/AuthenticationsActions"
import { bindActionCreators } from "redux";


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
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleShow(e) {
        e.preventDefault();
        const { showLoginDialogAction } = this.props
        showLoginDialogAction()
    }

    handleClose() {
        const { hideLoginDialogAction } = this.props
        hideLoginDialogAction()
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState( { [name]: value } )
    }

    handleSubmit(e){
        e.preventDefault()
        const {userID, password} = this.state
        const {authenticateUserAction} = this.props

        authenticateUserAction(userID, password)
    }

    handleLogout(e) {
        e.preventDefault()
        const {logoutAction} = this.props
        logoutAction()
    }

    render() {

        let showDialog = this.props.showLoginDialog;
        if (showDialog === undefined) {
            showDialog = false
        }

        const token = this.props.accessToken
        const error = this.props.error
        let buttonState
        let wrongLogin

        if(token){
            buttonState = <Button to="/" id="LogoutButton" variant="dark" onClick={this.handleLogout} >Logout</Button>
        }
        else{
            buttonState = <Button id="OpenLoginDialogButton" variant="light" onClick={this.handleShow}>Login</Button>
        }

        if(error){
            wrongLogin = <p className="text-danger">User ID or password was wrong!</p>
        }

        return (
            <div>
                {buttonState}

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control id="LoginUserIDInput" type="text" placeholder="User ID" name="userID" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="LoginPasswordInput" type="password" placeholder="Password" name='password' onChange={this.handleChange} />
                            </Form.Group>
                            {wrongLogin}
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
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser,
    logoutAction: authenticationActions.getLogoutUserAction
}, dispatch)

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget;