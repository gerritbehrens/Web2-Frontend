import {Card} from "react-bootstrap"
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        state
    }
}

// const mapDispatchToProps = dispatch => bindActionCreators({
//     setForum: (forum) => {
//         dispatch(ForumActions.setForumAction(forum))
//     }
// }, dispatch)

class MessageCard extends Component {

    render(){
        console.log("Create MessageCard")
        return (
            <Card key={this.props.k} id={"ForumMessage" + this.props.message.forumThreadID} >
                <Card.Body className={"m-2"}>
                    <Card.Title align={"left"}>{this.props.message.title}</Card.Title>
                    <Card.Footer>
                        <p align={"left"}>
                            {this.props.message.text}
                        </p>
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(MessageCard)