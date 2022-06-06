import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

import * as authenticationActions from "../actions/AuthenticationsActions"
import { bindActionCreators } from "redux";

const mapStateToProps = state => {
    return state
}

class UserSessionWidget extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleShow(e) {
        e.preventDefault();
        //this.setState({show: true})
        const { showLoginDialogAction } = this.props
        showLoginDialogAction()
    }

    handleClose() {
        //this.setState({show: false})
        const { hideLoginDialogAction } = this.props
        hideLoginDialogAction()
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState( { [name]: value } )
        console.log(JSON.stringify(this.state))
    }

    handleSubmit(e){
        e.preventDefault()
        const {username, password} = this.state
        const {authenticateUserAction} = this.props

        authenticateUserAction(username, password)
        console.log("Pushed submit")
    }

    render() {

        var showDialog = this.props.showLoginDialog
        if (showDialog === undefined) {
            showDialog = false
        }

        return (
            <div>
                <Button variant="secondary" onClick={this.handleShow}>
                    Login
                </Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Name" name='username' onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="secondary" type="submit" onClick={this.handleSubmit}>
                                Submit
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
    authenticateUserAction: authenticationActions.authenticateUser
}, dispatch)

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget;