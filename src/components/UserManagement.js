import { Component } from "react";
import { connect } from "react-redux";
import UserList from "./UserList";
import UserDialog from"./UserDialog"

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
				'Authorization': 'Bearer ' + this.props.accessToken
			}
		}

		// send request
		fetch("https://localhost/users", requestOptions)
			.then(response => response.json())
			.then(users => {
				this.setState({users: users})
			})
	}

	render(){

		return(
			<main className="page-content p-3" style={{ background: 'white' }}>
				<h1>User Management</h1>
				<UserDialog/>
				<div className={"pt-2"}></div>
					<UserList users={this.state.users} />
			</main>
		)
	}
}

export default connect(mapStateToProps)(UserManagement)