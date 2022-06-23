import { Component } from "react";
import { connect } from "react-redux";
import UserList from "./UserList";
import CreateUserDialog from "./CreateUserDialog"
import * as UserActions from "../actions/UserActions";


const mapStateToProps = state => {
	return {
		users: state.users,
		accessToken: state.accessToken,
		updatePage: state.updatePage
	}
}

class UserManagement extends Component {

	componentDidMount(){
		this.props.getAllUsers(this.props.accessToken)
	}



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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)