import {Card} from "react-bootstrap"
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";

const UserCard = ({ k, user }) => {
	return (

		<Card key={k} id={"UserItem" + user.userID} style={{color: '#333333', background: '#f4f4f4', border: "groove", borderColor: "lightgray", width: '18rem', minWidth: 393}}>
			<Card.Body  className={"m-2"}>
				<Card.Title align={"left"}>UserID: {user.userID}</Card.Title>
				<Card.Footer style={{color: '#333333', background: '#eaeaea'}}>
					<p align={"left"}>Username: {user.userName}<br/>
						Administrator: {user.isAdministrator ? 'Ja' : 'Nein'}</p>
				</Card.Footer>

				<Card.Footer align={"left"} style={{color: 'white', background: '#eaeaea'}}>
					<div className={"d-inline-flex gap-2"}>
						<EditUserDialog key={user.userID.toString() + "Edit"} user={user}/>
						<DeleteUserDialog key={user.userID.toString() + "Delete"} user={user} className={"px-0-1"}/>
					</div>
				</Card.Footer>
			</Card.Body>
		</Card>
	)
}

export default UserCard