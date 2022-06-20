import { Card, Button } from "react-bootstrap"
import editUserDialog from "./EditUserDialog";

const UserCard = ({ userID, userName, isAdministrator }) => {

	return (

	<Card >
		<Card.Body id={"UserItem" + userID} className={"m-2"}>
			<Card.Title align={"left"}>UserID: {userID}</Card.Title>
			<Card.Footer>
				<p align={"left"}>Username: {userName} <br/>
					Administrator: {isAdministrator ? 'Ja' : 'Nein'}</p>
			</Card.Footer>

			<Card.Footer align={"left"}>
				<editUserDialog value={userID}/>
				<Button variant="outline-danger">Delete</Button>
			</Card.Footer>
		</Card.Body>
	</Card>
	)
}

export default UserCard