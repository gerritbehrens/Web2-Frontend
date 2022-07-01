import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import UserSessionWidget from "./UserSessionWidget";

import Logo from "../images/BHT_Logo_horizontal_Anthrazit_transparent.svg";
import { connect } from "react-redux"
import { Buffer } from "buffer";
import {BrowserRouter as Router, Link} from "react-router-dom"

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
        let forumsThreads
        if (isUserAdmin(this.props.accessToken)) {
            usermanagement =
                <Link to="/userManagement" id="OpenUserManagementButton" className="nav-link">
                    User Management
                </Link>
        }
        if(this.props.accessToken){
            forumsThreads =
                <Link to={"/forumPage"} id="OpenForumThreadOverviewButton" className="nav-link">
                    Forums
                </Link>
        }
        return (
            <Navbar bg="light" expand="lg" className={"navbar sticky-top navbar-light bg-light"}>
                <Container>
                    <Navbar.Brand to="/">
                        <img width="204" height="60" src={Logo} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                            <Link to="/" id="OpenPrivatePageButton" className="nav-link">Home</Link>
                            {forumsThreads}
                            {usermanagement}

                            <NavDropdown title="More" id="basic-nav-dropdown">
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
        )
    }
}

const ConnectedTopMenue = connect(mapStateToProps)(TopMenue)

export default ConnectedTopMenue