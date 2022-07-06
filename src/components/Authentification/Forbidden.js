import {Component} from "react";
import LoginButton from "./LoginButton";
import Logo from "../../images/BHT_Logo_horizontal_Anthrazit_transparent.svg";
import React from "react";

class Forbidden extends Component{
    render() {
        return(
                <div className={"container p-2"} style={{color: '#333333'}}>
                    <img width="816" height="240" src={Logo} alt="BHT-logo" />
                        <h1>You are NOT allowed to be here!</h1>
                            <p>Login if you want to access your personnel profile.</p>

                    <LoginButton/>
                </div>
            )
    }
}

export default Forbidden