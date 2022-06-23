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
				<div className={"d-inline-flex gap-2"} align={"left"}>
					<h1 >User Management</h1>
					<CreateUserDialog/>
				</div>

				<div className={"pt-2"}><UserList users={this.props.users} /></div>

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