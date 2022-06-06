import React, { Component } from "react";
import LoginButton from "../components/LoginButton";

class PublicPage extends Component {

    render() {
        return (
            <div>
                <h1>Willkommen to MYForum</h1>
                <p>Here you can talk to each other in a friendly way about any topic!</p>
                <LoginButton/>
            </div>
        )
    }
}

export default PublicPage;