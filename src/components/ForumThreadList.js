import React from "react";
import { Container } from "react-bootstrap";
import ForumThreadCard from "./ForumThreadCard"

const ForumThreadList = ({forums}) => {
    return(
        <Container style={{gap: "1rem", display: "flex", flexdirection: "row", flexWrap: "wrap"}}>
            {forums.map((forum) => {
                const id = "ForumThread" + forum._id
                return(<ForumThreadCard id={id} key={forum._id} forum={forum} className={"card MessageCard forumThread"}/>)
            })}
        </Container>
    )
}

export default ForumThreadList