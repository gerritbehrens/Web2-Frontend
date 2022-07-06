import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

import { getShowLoginDialogAction } from "../../actions/Authentification/AuthenticationsActions";

class LoginButton extends Component {

    constructor(props) {
        super(props)
        this.showLoginDialog = this.showLoginDialog.bind(this)
    }

    showLoginDialog() {
        const dispatch = this.props.dispatch
        dispatch(getShowLoginDialogAction())
    }

    render() {
        return (
            <div>
                <Button id="OpenLoginDialogButton" onClick={this.showLoginDialog} style={{background: "#00a0aa", borderColor: "#00a0aa"}}>
                    Login
                </Button>
            </div>
        )
    }
}

export default connect()(LoginButton)