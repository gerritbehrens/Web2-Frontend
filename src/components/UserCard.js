import { Card, Button } from "react-bootstrap"
import EditUserDialog from "./EditUserDialog";

const UserCard = ({ k, user }) => {
console.log("Create card")
	return (

	<Card key={k} id={"UserItem" + user.userID}>
		<Card.Body  className={"m-2"}>
			<Card.Title align={"left"}>UserID: {user.userID}</Card.Title>
			<Card.Footer>
				<p align={"left"}>Username: {user.userName} <br/>
					Administrator: {user.isAdministrator ? 'Ja' : 'Nein'}</p>
			</Card.Footer>

			<Card.Footer align={"left"}>
				<EditUserDialog key={user.userID} user={user}/>
				<Button variant="outline-danger">Delete</Button>
			</Card.Footer>
		</Card.Body>
	</Card>
	)
}

export default UserCard