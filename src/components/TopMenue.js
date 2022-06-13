import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import UserSessionWidget from "./UserSessionWidget";
import UserManagementPage from "./UserManagementPage";
import App from "../App";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from "react-router-dom";

import Logo from "../images/BHT_Logo_horizontal_Anthrazit_transparent.svg";
import { connect } from "react-redux"
import { Buffer } from "buffer";
import PublicPage from "./PublicPage";

const mapStateToProps = state => {
    return state
}

function isUserAdmin(token) {
    if (token) {
        //Decode and split Base64
        const credentials = Buffer.from(token, 'base64').toString('ascii')
        const isAdmin = credentials.split(',')[3];

        //Extract userID- and isAdministrator-Value
        const isAdministrator = isAdmin.split(':')[1]

        if (isAdministrator === "true") return true
        else return false
    }
    else {
        return false
    }
}

class TopMenue extends Component {

    constructor(props) {
        super(props)
        this.handleRoute = this.handleRoute.bind(this)
    }

    handleRoute(e) {
        console.log("Handle Route")
    }

    render() {
        let usermanagement
        if (isUserAdmin(this.props.accessToken)) {
            usermanagement =
                    <NavLink to="/userManagement" id="OpenUserManagementButton">
                        User Management
                    </NavLink>
        }
        return (
            <Router>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img width="204" height="60" src={Logo} alt="Logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                {usermanagement}
                                
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>

                            </Nav>
                            <UserSessionWidget />
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/" element={<PublicPage/>}></Route>
                    <Route path="/usermanagement" element={<UserManagementPage />}></Route>
                </Routes>
            </Router>

        )
    }
}

const ConnectedTopMenue = connect(mapStateToProps)(TopMenue)

export default ConnectedTopMenue