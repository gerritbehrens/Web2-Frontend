import React, { Component } from "react";
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return state
  }

class UserManagementPage extends Component {

    render() {
        return (
            <div className="page-content" id="UserManagementPage">
                <h1>This is the user management page</h1>
                <p>Here you can manage users!</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(UserManagementPage);