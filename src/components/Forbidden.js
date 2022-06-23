import {Component} from "react";
import LoginButton from "./LoginButton";

class Forbidden extends Component{
    render() {
        return(
                <div>
                    <h1>You are NOT allowed to be here!</h1>
                    <p>Login if you want to access your personnel profile.</p>
                    <LoginButton/>
                </div>
            )
    }
}

export default Forbidden