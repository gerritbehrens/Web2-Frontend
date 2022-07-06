import {getAllForums} from "./CreateForumThreadActions";
import * as ForumActions from "./CreateForumThreadActions";

export function updateForum(forum, name, description, token){
    console.log("Update Forum - Data:")
    return dispatch =>{
        createPutRequest(forum._id, name, description, token)
            .then(
                forum => {
                    dispatch(ForumActions.getAllForums(token))
                },
                error => {
                    console.log(error)
                }
            )
            .catch(error => {
                console.log(error)
            })
    }
}

function createPutRequest(forumID, name, description, token){
    let data = {
        name: name,
        description: description
    }

    console.log(data)

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }
    const url = "https://localhost/forumThreads/" + forumID

    console.log(url)

    return fetch(url, requestOptions)
        .then(handleEditResponse)
        .then( () => {
           getAllForums()
        })
        .then(forum => {
            return forum
        })
}

function handleEditResponse(response){
    return response.text().then(() => {
        if(!response.ok){
            if(response.status === 404){
                console.log("Error 404 Conflict")
                const error = response.statusText
                return Promise.reject(error)
            }
            if(response.status === 400){
                console.log("Error 400 Bad Request")
                const error = response.statusText
                return Promise.reject(error)
            }
        }
        else{
            console.log("Forum Edited")
            return{
                response
            }
        }
    })
}