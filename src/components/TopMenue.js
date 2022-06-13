import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import UserSessionWidget from "./UserSessionWidget";

import Logo from "../images/BHT_Logo_horizontal_Anthrazit_transparent.svg";
import { bindActionCreators } from "redux";
import * as authenticationActions from "../actions/AuthenticationsActions"
import { connect } from "react-redux"

const mapStateToProps = state => {
    return state
}

function isUserAdmin(token) {
    console.log("Check if User is Admin")
    
    if (token) {
        //Decode and split Base64
        const credentials = Buffer.from(token, 'base64').toString('ascii');
        const [isAdmin] = credentials.split(',');

        //Extract userID- and isAdministrator-Value
        const isAdministrator = isAdmin.split(':')[1]

        console.log(isAdministrator + token)

        if (isAdministrator) return true
        else return false
    }
    else{
        return false
    }
}

class TopMenue extends Component {

    constructor(props) {
        super(props)
        this.handleRoute = this.handleRoute.bind(this)
    }
    
    handleRoute() {
       console.log("Handle Route")
    }

    render() {
        let usermanagement
        if (isUserAdmin(this.props.accessToken)) {
            usermanagement = 
            <Nav.Link href="/usermanagement" to="/usermanagement" id="OpenUserManagementButton" onClick={this.handleRoute}>
                UserManagement
            </Nav.Link>
        }
        return (

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img width="204" height="60" src={Logo} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            {usermanagement}
                        </Nav>
                        <UserSessionWidget />
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser,
    logoutAction: authenticationActions.getLogoutUserAction
}, dispatch)

const ConnectedTopMenue = connect(mapStateToProps, mapDispatchToProps)(TopMenue)


export default ConnectedTopMenue