import {Component} from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import {Form, FormGroup, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import * as ForumActions from "../../actions/ForumThread/CreateForumThreadActions";
import * as EditForumActions from "../../actions/ForumThread/EditForumThreadActions";

const mapStateToProps = (state) => {
    return{
        accessToken: state.accessToken,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    updateForum: EditForumActions.updateForum,
    getAllForums: () => {
        dispatch(
            ForumActions.getAllForums()
        )
    }
}, dispatch)

class EditForumThreadDialog extends Component{
    initialState = {
        ownerID: "",
        name: "",
        description: "",
        showDialog: false
    }

    constructor(props) {
        super(props)
        this.state = this.initialState
    }

    componentDidMount() {
        if(this.props.forum){
            this.setState(this.props.forum)
        }
    }

    handleShowEditDialog = (e) => {
        e.preventDefault()
        this.setState({showDialog: true})
        this.setState(this.props.forum)
    }

    handleChange = (e) => {
        const{name, value} = e.target
        this.setState({ [name]: value } )
    }

    handleCloseEditDialog = () => {
        this.setState({showDialog: false} )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const name = document.querySelector("#ForumThreadNameInput").value
        const description = document.querySelector("#ForumThreadDescriptionInput").value

        const token = this.props.accessToken


        this.props.updateForum(this.props.forum, name, description, token)
        if(this.props.error == null){
            this.handleCloseEditDialog()
        }
    }

    render() {
        let showUserEditDialog = this.state.showDialog;
        if(showUserEditDialog === undefined) {
            console.log("Set showEditForumThreadDialog -> false")
            showUserEditDialog = false
        }

        const error = this.props.error
        let errorWhileUpdate

        let owner = this.state.ownerID
        let name = this.state.name
        let description = this.state.description

        let disabled = true
        if(this.props.accessToken) disabled = false
        if(error){
            errorWhileUpdate = <p className={"text-danger"}>Something went wrong while updating!</p>
        }

        return(
            <div>
                <Button id={"EditForumThreadButton" + this.props.forum._id} variant={"dark"} onClick={this.handleShowEditDialog} disabled={disabled}>
                    <i className="fa-solid fa-user-pen"/>
                    Edit
                </Button>

                <Modal show={showUserEditDialog} onHide={this.handleCloseEditDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Forum</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <FormGroup className={"mb-3"}>
                                <Form.Label>Owner</Form.Label>
                                <Form.Control id={"OwnerForumThread"} type={"text"} defaultValue={owner} name={"ForumThreadOwner"} disabled={true}/>
                            </FormGroup>

                            <FormGroup className={"mb-3"}>
                                <Form.Label>Topic</Form.Label>
                                <Form.Control id={"ForumThreadNameInput"}  type={"text"} defaultValue={name} name={"ForumThreadName"}/>
                            </FormGroup>

                            <FormGroup className={"mb-3"}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control id={"ForumThreadDescriptionInput"} type={"text"} aria-rowspan={3} defaultValue={description} name={"ForumThreadDescription"}/>
                            </FormGroup>

                            <FormGroup>
                                {errorWhileUpdate}
                                <Button id="SaveForumThreadButton" variant="secondary" type="submit" onClick={this.handleSubmit}>
                                    Save
                                </Button>

                                <Button id={"CancelEditForumThreadButton"} className={"m-sm-1"} variant={"outline-danger"} onClick={this.handleCloseEditDialog}>
                                    Cancel
                                </Button>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForumThreadDialog)