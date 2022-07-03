import { Card } from "react-bootstrap"
import Button from "react-bootstrap/Button";
import EditForumThreadDialog from "./EditForumThreadDialog"
import DeleteForumDialog from "./DeleteForumDialog"
// import DeleteForumThreadDialog from "./DeleteForumThreadDialog"

const ForumThreadCard = ({ k, forum }) => {
    console.log("Create ForumThreadCard")

    return (
        <Card key={k} id={"ForumThread" + forum._id} >
            <Card.Body className={"m-2"}>
                <Card.Title align={"left"}>{forum.name}</Card.Title>
                <Card.Footer>
                    <p align={"left"}>
                        Topic: {forum.name}<br/>
                        Description: {forum.description}<br/>
                        Owner: {forum.ownerID}
                        </p>
                </Card.Footer>

                <Card.Footer align={"left"}>
                    <div className={"d-inline-flex gap-2"}>
                        <EditForumThreadDialog key={forum._id.toString() + "Edit"} forum={forum}/>
                        <DeleteForumDialog key={forum._id.toString() + "Delete"} forum={forum} className={"px-0-1"} />
                    </div>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default ForumThreadCard