import { Component } from "react";
import { connect } from "react-redux";
import UserList from "./UserList";

const mapStateToProps = state => {
	return state
}

class UserManagement extends Component {

	constructor(props){
		super(props)
		this.state = {
			users: []
		}
	}

	componentDidMount(){

		// build request to rest api for showing all users
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.authenticationReducer.accessToken
			}
		}

        console.log(requestOptions)

		// send request
		fetch("https://localhost/users", requestOptions)
			.then(response => response.json())
			.then(users => {
				this.setState({users: users})
			})
	}

	render(){

		return(
			<main className="page-content p-3">
				<h1>User Management</h1>
				<UserList users={this.state.users} />
			</main>
		)
	}	
}

export default connect(mapStateToProps)(UserManagement)

/* import React, { Component } from "react";
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return state
  }

class UserManagement extends Component {

    render() {
        return (
            <div className="page-content" id="UserManagementPage">
                <h1>This is the user management page</h1>
                <div className="card" style={{width: 400}}>
                    <div className ="card-body">This is a User!</div>
                </div>

                <div className="card" style={{width: 400}}>
                    <div className ="card-body">This is a User!</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(UserManagement); */