import {connect} from "react-redux";

export const GET_ALL_FORUMS = "GET_ALL_FORUMS"

export const CREATE_FORUM_PENDING = "CREATE_FORUM_PENDING"
export const CREATE_FORUM_ERROR   = "CREATE_FORUM_ERROR"

export const SET_FORUM = "SET_FORUM"

const mapStateToProps = state =>{
    return state
}

export function getAllForumsAction(forums){
    return{
        type: GET_ALL_FORUMS,
        payload: forums,
    }
}

export function getForumCreatePending() {
    return{
        type: CREATE_FORUM_PENDING
    }
}

export function getForumCreateError(error){
    return{
        type: CREATE_FORUM_ERROR,
        error: error
    }
}

export function setForumAction(forum){
    return {
        type: SET_FORUM,
        payload: forum
    }
}

export function getAllForums(){
    return dispatch =>{
        // build request to rest api for showing all users
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // send request
        fetch("https://localhost/forumThreads", requestOptions)
            .then(response => response.json())
            .then(forums => {
                dispatch(getAllForumsAction(forums))
            })
    }
}

export function createForum(ownerID, name, description, token){
    return dispatch => {
        dispatch(getForumCreatePending())
        createRequest(ownerID, name, description, token)
            .then(
                forum => {
                    dispatch(getAllForums(token))
                },
                error => {
                    dispatch(getForumCreateError(error))
                }
            )
            .catch(error => {
                dispatch(getForumCreateError(error))
            })
    }
}

function createRequest(ownerID, name, description, token){
    const data = {
        ownerID: ownerID,
        name: name,
        description: description
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }
    return fetch('https://localhost/forumThreads', requestOptions)
        .then(handleResponse)
        .then(forum => {
            return forum
        })
}

function handleResponse(response){

    return response.text().then(() => {
        if(!response.ok){
            if(response.status === 409){
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

export default connect(mapStateToProps)