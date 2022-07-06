import * as MessageActions from "../../actions/Message/MessageActions";
import {Component} from "react";
import CreateMessageDialog from "./CreateMessageDialog";
import MessageList from "./MessageList";
import {connect} from "react-redux";
import React from "react";

const mapStateToProps = state => {
    return{
        messages: state.messages,
        accessToken: state.accessToken,
        forum: state.forum
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMessages: (token, forumID) => {
            dispatch(
                MessageActions.getAllMessages(token, forumID)
            )
        }
    }
}

class MessagePage extends Component {

    componentDidMount() {
        this.props.getAllMessages(this.props.accessToken, this.props.forum._id)
    }

    render() {

        let createMessageDialog
        if(this.props.accessToken) createMessageDialog = <CreateMessageDialog/>

        return(

            <main className={"container page-content p-3"} style={{ background: 'white'}}>

                <div className={"container d-inline-flex gap-2"}>
                    <div align={"left"} >
                        <h1>{this.props.forum.name}</h1>
                        <p>Description: {this.props.forum.description} - by {this.props.forum.ownerID}</p>
                    </div>
                    {createMessageDialog}
                    </div>

                <div className={"pt-2"}> <MessageList messages={this.props.messages} /> </div>

            </main>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)