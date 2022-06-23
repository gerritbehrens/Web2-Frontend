import * as userActions from "./UserActions";

export const DELETE_USER_PENDING = "DELETE_USER_PENDING"
export const DELETE_USER_SHOW = "DELETE_USER_SHOW"
export const DELETE_USER_ERROR = "DELETE_USER_ERROR"
export const DELETE_USER_HIDE = "DELETE_USER_HIDE"

export function getDeleteUserPendingAction(){
    return{
        //deletePending -> TRUE
        type: DELETE_USER_PENDING,
    }
}

export function getDeleteUserShowAction(userID){
    return{
        type: DELETE_USER_SHOW,
        payload: userID
    }
}

export function getDeleteUserErrorAction(error){
    return{
        //error in Reducer -> action.payload gesetzt werden
        type: DELETE_USER_ERROR,
        payload: error
    }
}

export function getDeleteUserHideAction(){
    return{
        type: DELETE_USER_HIDE
    }
}

export function deleteUser(userID, token){
    console.log("Delete User")

    return dispatch => {
        dispatch(getDeleteUserPendingAction())
        createRequest(userID, token)
            .then(
                dispatch(userActions.getAllUsers(token))
            )
            .catch(error => {
                dispatch(getDeleteUserErrorAction(error))
            })
    }
}

function createRequest(userID, token){
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return fetch('https://localhost/users/' + userID, requestOptions)
        .then(handleResponse)
}

function handleResponse(response){

    return response.text().then(() => {
        if(!response.ok){
            if(response.status === 404){
                console.log("Error 404 Conflict")
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
            console.log("User Deleted")
            return{
                response
            }
        }

    })
}
