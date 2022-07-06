import { Component } from "react";
import { connect } from "react-redux";
import UserList from "./UserList";
import CreateUserDialog from "./CreateUserDialog"
import * as UserActions from "../../actions/User/UserActions";


const mapStateToProps = state => {
	return {
		users: state.users,
		accessToken: state.accessToken,
		updatePage: state.updatePage
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

class UserManagement extends Component {

	componentDidMount(){
		this.props.getAllUsers(this.props.accessToken)
	}



	render(){
		return(
			<main className="container page-content p-3">
				<div className={"container d-inline-flex gap-2"} align={"left"}>
					<h1 >User Management</h1>
					<CreateUserDialog/>
				</div>

				<UserList users={this.props.users} />

			</main>
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)