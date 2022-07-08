import {Card} from "react-bootstrap"
import React, {Component} from "react";
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
        return result.slice(0,18)
    }

    render(){
        let dateTime = this.formatTime()
        return (
                <Card key={this.props.k} id={"ForumMessage" + this.props.message._id} style={{color: '#333333', background: '#f4f4f4', border: "groove", borderColor: "lightgray", width: '18rem', minWidth: 393}}>
                    <Card.Body className={"m-2"}>
                        <Card.Title align={"left"}>{this.props.message.title}</Card.Title>
                        <Card.Footer style={{color: '#333333', background: '#eaeaea'}}>
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