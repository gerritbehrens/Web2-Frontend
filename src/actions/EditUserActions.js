import {connect} from "react-redux";
import * as UserActions from "./UserActions";
import userActions, {getAllUsers} from "./UserActions";


export const SHOW_EDIT_USER_DIALOG = "SHOW_EDIT_USER_DIALOG"
export const HIDE_EDIT_USER_DIALOG = "HIDE_EDIT_USER_DIALOG"

export const EDIT_USER_PENDING = "EDIT_USER_PENDING"
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS"
export const EDIT_USER_ERROR   = "EDIT_USER_ERROR"

const mapStateToProps = state => {
    return state
}

export function getShowEditUserDialogAction() {
    return {
        type: SHOW_EDIT_USER_DIALOG,
        showEditUserDialog: true,
    }
}

export function getHideEditUserDialogAction() {
    return {
        type: HIDE_EDIT_USER_DIALOG,
        showEditUserDialog: false
    }
}

export function getEditUserPending() {
    return{
        type: EDIT_USER_PENDING
    }
}

export function getEditUserCreateSuccess(){
    return{
        type: EDIT_USER_SUCCESS,
    }
}

export function getEditUserCreateError(error){
    return{
        type: EDIT_USER_ERROR,
        error: error
    }
}

export function updateUser(userID, userName, password, isAdministrator, token){
    console.log("Update User")
    console.log(token)
    return dispatch =>{
        dispatch(getEditUserPending())
        createRequest(userID, userName, password, isAdministrator, token)
            .then(
                user => {
                    dispatch(getAllUsers(token))
                },
                error => {
                    console.log(error)
                    dispatch(getEditUserCreateError(error))
                }
            )
            .catch(error => {
                dispatch(getEditUserCreateError(error))
            })
    }

}

function createRequest(userID, userName, password, isAdministrator, token){
    let data
    if(password.length === 0){
        data = {
            userName: userName,
            isAdministrator: isAdministrator
        }
    }else{
        data = {
            userName: userName,
            password: password,
            isAdministrator: isAdministrator
        }
    }


    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)


    }
    return fetch('https://localhost/users/' + userID, requestOptions)
        .then(handleEditResponse)
        .then( () => {
           UserActions.getAllUsers(token)
        })
        .then(user => {
            return user
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
            console.log("User Edited")
            return{
                response
            }
        }
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: (token) => {
            dispatch(
                UserActions.getAllUsers(token)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)





