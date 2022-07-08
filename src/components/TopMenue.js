import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import UserSessionWidget from "./Authentification/UserSessionWidget";

import Logo from "../images/BHT_Logo_horizontal_Anthrazit_transparent.svg";
import { connect } from "react-redux"
import { Buffer } from "buffer";
import {Link} from "react-router-dom"

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

    render() {
        let userManagement
        let forumsThreads = <Link to={"/forumPage"} id="OpenForumThreadOverviewButton" className="nav-link">
                                Forums
                            </Link>

        if (isUserAdmin(this.props.accessToken)) {
            userManagement =
                <Link to="/userManagement" id="OpenUserManagementButton" className="nav-link">
                    User Management
                </Link>
        }

        return (
            <Navbar expand="md" className={"navbar sticky-top"}>
                <Container>
                    <Navbar.Brand to="/">
                        <img width="204" height="60" src={Logo} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                            <Link to="/" id="OpenPrivatePageButton" className="nav-link">Home</Link>
                            {forumsThreads}
                            {userManagement}

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