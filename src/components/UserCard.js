import { Card, Button } from "react-bootstrap"

const UserCard = ({ userID, userName, isAdministrator }) => {

	return (

	<Card >
		<Card.Body id={"UserItem" + userID}>
			<Card.Title align={"left"}>{userID}</Card.Title>
			<Card.Footer>
				<p align={"left"}>Username: {userName} <br/>
					Administrator: {isAdministrator ? 'Ja' : 'Nein'}</p>
			</Card.Footer>

			<Card.Footer align={"left"}>
				<Button variant="outline-dark">Bearbeiten</Button>
				<Button variant="outline-danger">Delete</Button>
			</Card.Footer>
		</Card.Body>
	</Card>
	)
}

export default UserCard