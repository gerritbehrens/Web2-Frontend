import { Component } from "react";
import { connect } from "react-redux";
import UserList from "./UserList";
import CreateUserDialog from "./CreateUserDialog"
import {bindActionCreators} from "redux";
import * as UserActions from "../actions/UserActions";
import {getAllUsers, updateUserManagementActionFinished} from "../actions/UserActions";

const mapStateToProps = state => {
	return {
		users: state.users,
		accessToken: state.accessToken,
		updatePage: state.updatePage
	}
}

class UserManagement extends Component {

	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.props.getAllUsers(this.props.accessToken)
		// // build request to rest api for showing all users
		// const requestOptions = {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'Authorization': 'Bearer ' + this.props.accessToken
		// 	}
		// }
		//
		// // send request
		// fetch("https://localhost/users", requestOptions)
		// 	.then(response => response.json())
		// 	.then(users => {
		// 		this.setState({users: users})
		// 	})

	}

	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	console.log(this.props.updatePage)
	// 	if(this.props.updatePage === true){
	// 		console.log("Updating view")
	//
	// 		this.props.getAllUsers(this.props.accessToken)
	// 	}
	//
	// }


	render(){
		return(
			<main className="page-content p-3" style={{ background: 'white' }}>
				<h1>User Management</h1>
				<CreateUserDialog/>
				<div className={"pt-2"}></div>
					<UserList users={this.props.users} />
			</main>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllUsers: (token) => {
			dispatch(
				UserActions.getAllUsers(token)
			)
		},
		updateFinished: () => {
			dispatch(
				UserActions.updateUserManagementActionFinished()
			)

	}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)