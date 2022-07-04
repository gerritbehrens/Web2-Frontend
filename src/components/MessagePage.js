import * as MsgActions from "../actions/MessageActions";
import {Component} from "react";
import CreateMsg from "./CreateMessageDialog";
import MessageList from "./MessageList";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
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
        // getAllMsg: (token) => {
        //     dispatch(
        //         MsgActions.getAllMsg(token)
        //     )
        // },
    }
}

class MessagePage extends Component {

    // componentDidMount() {
    //     this.props.getAllMsg(this.props.accessToken)
    // }

    render() {
        console.log(this.props.messages)
        console.log(this.props.forum)

        return(

            <main className={"page-content p-3"} style={{ background: 'white'}}>

                <div className={"d-inline-flex gap-2"}>
                    <h1>Messages</h1>
                    {/*<CreateMsg/>*/}
                </div>

                {/*<div className={"pt-2"}> <MessageList forums={this.props.messages} /> </div>*/}

            </main>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)