import React, { Component } from "react";
import LoginButton from "../components/LoginButton";

class PublicPage extends Component {

    render() {
        return (
            <div className="page-content container p-2" id="LandingPage" style={{ background: 'gray', color: 'white' }}>
                <h1>Welcome to MYForum</h1>
                <p>Here you can talk to each other in a friendly way about any topic!</p>
                <LoginButton />
            </div>
        )
    }
}

export default PublicPage;