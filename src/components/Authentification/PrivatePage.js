import React, { Component } from "react";
import { connect } from "react-redux"

const mapStateToProps = state => {
	return state
}

class PrivatePage extends Component {

    render() {
        return (
            <div className="page-content p-2" id="PrivatePage" style={{ background: 'gray', color: 'white' }}>
                <h1>Welcome to your private page, {this.props.userID}!</h1>
                <p>Navigate to via the navigation bar at the top to explore the page!</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PrivatePage)