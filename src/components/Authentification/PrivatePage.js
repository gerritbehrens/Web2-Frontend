import React, { Component } from "react";
import { connect } from "react-redux"
import Logo from "../../images/BHT_Logo_horizontal_Anthrazit_transparent.svg";

const mapStateToProps = state => {
	return state
}

class PrivatePage extends Component {

    render() {
        return (
            <div className="page-content p-2" id="PrivatePage" style={{color: '#333333' }}>
                <h1>Welcome to your private page, {this.props.userID}!</h1>
                <p>Navigate to via the navigation bar at the top to explore the page!</p>
                <img width="408" height="120" src={Logo} alt="BHT-logo" />
            </div>
        )
    }
}

export default connect(mapStateToProps)(PrivatePage)