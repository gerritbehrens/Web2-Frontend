import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

import { getShowUserDialogAction } from "../actions/UserActions";

class LoginButton extends Component {

    constructor(props) {
        super(props)
        this.showUserDialog = this.showUserDialog.bind(this)
    }

    showUserDialog() {
        const dispatch = this.props.dispatch
        dispatch(getShowUserDialogAction())
    }

    render() {
        return (
            <div>
                <Button id="OpenCreateUserDialogButton" variant="warning" onClick={this.showUserDialog} >
                    New User
                </Button>
            </div>
        )
    }
}

export default connect()(LoginButton)