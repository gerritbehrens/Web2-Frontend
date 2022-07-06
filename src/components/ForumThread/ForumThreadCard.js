import {Card} from "react-bootstrap"
import Button from "react-bootstrap/Button";
import EditForumThreadDialog from "./EditForumThreadDialog"
import DeleteForumDialog from "./DeleteForumThreadDialog"
import {Link} from "react-router-dom";
import React, {Component} from "react";
import * as ForumActions from "../../actions/ForumThread/CreateForumThreadActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setForum: (forum) => {
        dispatch(ForumActions.setForumAction(forum))
    }
}, dispatch)

class ForumThreadCard extends Component {

    onClick = () => {
        const forum = this.props.forum
        const {setForum} = this.props
        setForum(forum)
    }

    render(){
        console.log("Create ForumThreadCard")

        return (
            <Card key={this.props.k} id={"ForumThread" + this.props.forum._id} style={{color: 'white', background: 'gray', border: "groove", borderColor: "lightgray", width: '18rem', minWidth: 393}}>
                <Card.Body className={"m-2"}>
                    <Card.Title align={"left"}>{this.props.forum.name}</Card.Title>
                    <Card.Footer style={{color: 'white', background: 'gray'}}>
                        <p align={"left"}>
                            Topic: {this.props.forum.name}<br/>
                            Description: {this.props.forum.description}<br/>
                            Owner: {this.props.forum.ownerID}
                        </p>
                    </Card.Footer>

                    <Card.Footer align={"left"} style={{color: 'white', background: 'gray'}}>
                        <div className={"d-inline-flex gap-2"}>
                            <EditForumThreadDialog key={this.props.forum._id.toString() + "Edit"} forum={this.props.forum}/>
                            <DeleteForumDialog key={this.props.forum._id.toString() + "Delete"} forum={this.props.forum} className={"px-0-1"} />
                            <Link to="/forumMessages" className={"px-0-1"}>
                                <Button id="ViewForumThreadButton" variant="info" onClick={this.onClick}>
                                    <i className="fa-solid fa-angles-right"></i>
                                </Button>
                            </Link>
                        </div>
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumThreadCard)