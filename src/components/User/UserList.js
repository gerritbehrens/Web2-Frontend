import React from "react"
import { Container } from "react-bootstrap"
import UserCard from "./UserCard"

const UserList = ({users}) => {
	return(

		<Container style={{gap: "1rem", display: "flex", flexdirection: "row", flexWrap: "wrap"}}>
				{users.map((user, i) => {
					return(<UserCard key={i} user={user}/>)
				})}
		</Container>
	)
}

export default UserList