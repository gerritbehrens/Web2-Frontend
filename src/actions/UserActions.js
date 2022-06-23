import {connect} from "react-redux";

export const SHOW_USER_DIALOG = "SHOW_USER_DIALOG"
export const HIDE_USER_DIALOG = "HIDE_USER_DIALOG"

export const CREATE_USER_PENDING = "CREATE_USER_PENDING"
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
export const CREATE_USER_ERROR   = "CREATE_USER_ERROR"

export const GET_ALL_USERS = "GET_ALL_USERS"
export const UPDATE_USER_MANAGEMENT_FINISHED = "UPDATE_USER_MANAGEMENT_FINISHED"

const mapStateToProps = state => {
    return state
}

export function getShowUserDialogAction() {
    return {
        type: SHOW_USER_DIALOG,
        showUserDialog: true
    }
}

export function getHideUserDialogAction() {
    return {
        type: HIDE_USER_DIALOG,
        showUserDialog: false
    }
}

export function getUserCreatePending() {
    return{
        type: CREATE_USER_PENDING
    }
}

export function getUserCreateError(error){
    console.log(error)
    return{
        type: CREATE_USER_ERROR,
        error: error
    }
}

export function getAllUsersAction(users){
    console.log("getAllUsersACTION")
    return{
        type: GET_ALL_USERS,
        users: users,

    }
}

export function updateUserManagementActionFinished(){
    return{
        type: UPDATE_USER_MANAGEMENT_FINISHED
    }
}

export function getAllUsers(token){
console.log("I am in getAllUsers")
    return dispatch =>{
        // build request to rest api for showing all users
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        // send request
        fetch("https://localhost/users", requestOptions)
            .then(response => response.json())
            .then(users => {
                dispatch(getAllUsersAction(users))
            })
    }

}

export function createUser(userID, userName, password, isAdministrator, token){
    console.log("Create User")

    return dispatch =>{
        dispatch(getUserCreatePending())
        createRequest(userID, userName, password, isAdministrator, token)
            .then(
                user => {
                    dispatch(getAllUsers(token))
                },
                error => {
                    dispatch(getUserCreateError(error))
                }
            )
            .catch(error => {
                dispatch(getUserCreateError(error))
            })
    }

}

function createRequest(userID, userName, password, isAdministrator, token){
    const data = {
        userID: userID,
        userName: userName,
        password: password,
        isAdministrator: isAdministrator
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)


    }
    return fetch('https://localhost/users', requestOptions)
        .then(handleResponse)
        .then(user => {
            return user
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





