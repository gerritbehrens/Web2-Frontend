import React, { Component } from "react";
import LoginButton from "./Authentification/LoginButton";
import Logo from "../images/BHT_Logo_horizontal_Anthrazit_transparent.svg";

class PublicPage extends Component {

    render() {
        return (
            <div className="page-content container p-2" id="LandingPage" style={{color: '#333333' }}>
                <h1>Welcome to MYForum by BHT</h1>
                <p>Here you can talk to each other in a friendly way about any topic!</p>
                <img width="408" height="120" src={Logo} alt="BHT-logo" />
                <LoginButton />

            </div>
        )
    }
}

export default PublicPage;