import {connect} from "react-redux";

export const GET_ALL_MESSAGES = "GET_ALL_MESSAGES"

export const CREATE_MESSAGE_PENDING = "CREATE_MESSAGE_PENDING"
export const CREATE_MESSAGE_ERROR   = "CREATE_MESSAGE_ERROR"

const mapStateToProps = state =>{
    return state
}

export function getAllMessagesAction(messages){
    console.log("getAllMessagesAction")
    return{
        type: GET_ALL_MESSAGES,
        payload: messages
    }
}

export function getMessageCreatePending() {
    return{
        type: CREATE_MESSAGE_PENDING
    }
}

export function getMessageCreateError(error){
    return{
        type: CREATE_MESSAGE_ERROR,
        error: error
    }
}

export function getAllMessages(token, forumID){
    return dispatch =>{
        // build request to rest api for showing all users
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        // send request
        fetch("https://localhost/forumThreads" + "/" + forumID + "/" + "forumMessages", requestOptions)
            .then(response => response.json())
            .then(messages => {
                dispatch(getAllMessagesAction(messages))
            })
    }
}

export function createMessage(forumID, title, text, authorID, token){
    console.log(forumID + " " + title + " " + text + " " + authorID + " " + token)

    return dispatch => {
        dispatch(getMessageCreatePending())
        createRequest(forumID, title, text, token)
            .then(
                message => {
                    dispatch(getAllMessages(token, forumID))
                },
                error => {
                    dispatch(getMessageCreateError(error))
                }
            )
            .catch(error => {
                dispatch(getMessageCreateError(error))
            })
    }
}

function createRequest(forumID, title, text, token){
    const data = {
        forumThreadID: forumID,
        title: title,
        text: text
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }
    return fetch('https://localhost/forumMessages', requestOptions)
        .then(handleResponse)
        .then(message => {
            return message
        })
}

function handleResponse(response){

    return response.text().then(() => {
        if(!response.ok){
            if(response.status === 409){
                console.log("Error 409 Conflict")
                const error = response.statusText
                return Promise.reject(error)
            }
            if(response.status === 500){
                console.log("Error 500 Internal Server Error")
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
            console.log("User Created")
            return{
                response
            }
        }
    })
}

export default connect(mapStateToProps)