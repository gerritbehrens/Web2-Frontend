import * as ForumActions from "./CreateForumThreadActions";

export const DELETE_FORUM_PENDING = "DELETE_FORUM_PENDING"
export const DELETE_FORUM_SHOW = "DELETE_FORUM_SHOW"
export const DELETE_FORUM_ERROR = "DELETE_FORUM_ERROR"
export const DELETE_FORUM_HIDE = "DELETE_FORUM_HIDE"

export function getDeleteForumPendingAction(){
    return{
        //deletePendingForum
        type: DELETE_FORUM_PENDING
    }
}

export function getDeleteForumShowAction(forumID){
    return{
        type: DELETE_FORUM_SHOW,
        payload: forumID
    }
}

export function getDeleteForumErrorAction(error){
    return{
        type: DELETE_FORUM_ERROR,
        payload: error
    }
}

export function getDeleteForumHideAction(){
    return{
        type: DELETE_FORUM_HIDE
    }
}

export function deleteForum(forumID, token){
    return dispatch => {
        dispatch(getDeleteForumPendingAction())
        createRequest(forumID, token)
            .then(
                dispatch(ForumActions.getAllForums(token))
            )
            .catch(error => {
                dispatch(getDeleteForumErrorAction(error))
            })
    }
}

export function createRequest(forumID, token){
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return fetch('https://localhost/forumThreads/' + forumID, requestOptions)
        .then(handleResponse)
}

function handleResponse(response){

    return response.text().then(() => {
        if(!response.ok){
            if(response.status === 404){
                const error = response.statusText
                return Promise.reject(error)
            }
            if(response.status === 500){
                const error = response.statusText
                return Promise.reject(error)
            }
            if(response.status === 400){
                const error = response.statusText
                return Promise.reject(error)
            }
        }
        else{
            return{
                response
            }
        }

    })
}