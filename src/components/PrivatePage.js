import React, { Component } from "react";
import { connect } from "react-redux"

const mapStateToProps = state => {
	return state
}

class PrivatePage extends Component {

    render() {
        return (
            <div className="page-content p-2" id="PrivatePage" style={{ background: 'gray', color: 'white' }}>
                <h1>Welcome to your private Page, {this.props.userID}!</h1>
                <p>Navigate to "Forums" or "User Management" to explore the page! <br/>
                    Via "Home" you can come back here.</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PrivatePage)