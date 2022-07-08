import React from "react";
import { Container } from "react-bootstrap";
import MessageCard from "./MessageCard"

const MessageList = ({messages}) => {
    return(
        <Container style={{gap: "1rem", display: "flex", flexdirection: "row", flexWrap: "wrap"}}>
                {messages.map((message) => {
                const id = "ForumMessage" + message._id
                return(<MessageCard id={id} key={message._id} message={message} className={"card MessageCard forumMessage"}/>)
            })}
        </Container>
    )
}

export default MessageList