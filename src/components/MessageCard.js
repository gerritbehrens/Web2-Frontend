import {Card} from "react-bootstrap"
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        state
    }
}

class MessageCard extends Component {

    formatTime = () => {
        const date = this.props.message.createdAt.split("T")[0]
        const time = this.props.message.createdAt.split("T")[1]

        const result = date + " - " + time
        return result.slice(0,18) + " GMT"
    }

    render(){
        let dateTime = this.formatTime()
        console.log("Create MessageCard")
        return (
                <Card key={this.props.k} id={"ForumMessage" + this.props.message._id} >
                    <Card.Body className={"m-2"}>
                        <Card.Title align={"left"}>{this.props.message.title}</Card.Title>
                        <Card.Footer>
                            <p align={"left"}>
                                Created by: {this.props.message.authorID} at {dateTime}<br/>
                                Message: {this.props.message.text} <br/>
                            </p>
                        </Card.Footer>
                    </Card.Body>
                </Card>
        )
    }
}

export default connect(mapStateToProps)(MessageCard)