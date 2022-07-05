import React from "react";
import { Container } from "react-bootstrap";
import MessageCard from "./MessageCard"

const MessageList = ({messages}) => {
    return(
        <Container>
            {messages.map((message) => {
                console.log(message)
                const id = "ForumMessage" + message.forumThreadID
                return(<MessageCard id={id} key={message.forumThreadID} message={message} className={"card MessageCard forumMessage"}/>)
            })}
        </Container>
    )
}

export default MessageList