import {connect} from "react-redux";

export const SHOW_EDIT_USER_DIALOG = "SHOW_USER_DIALOG"
export const HIDE_EDIT_USER_DIALOG = "HIDE_USER_DIALOG"

export const EDIT_USER_PENDING = "CREATE_USER_PENDING"
export const EDIT_USER_SUCCESS = "CREATE_USER_SUCCESS"
export const EDIT_USER_ERROR   = "CREATE_USER_ERROR"

const mapStateToProps = state => {
    return state
}

export function getShowEditUserDialogAction() {
    return {
        type: SHOW_EDIT_USER_DIALOG,
        showUserDialog: true
    }
}

export function getHideEditUserDialogAction() {
    return {
        type: HIDE_EDIT_USER_DIALOG,
        showUserDialog: false
    }
}

export function getEditUserCreatePending() {
    return{
        type: EDIT_USER_PENDING
    }
}

export function getEditUserCreateSuccess(){
    return{
        type: EDIT_USER_SUCCESS
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

    return dispatch =>{
        dispatch(getEditUserCreatePending())
        createRequest(userID, userName, password, isAdministrator, token)
            .then(
                user => {
                    dispatch(getEditUserCreateSuccess())
                },
                error => {
                    dispatch(getEditUserCreateError(error))
                }
            )
            .catch(error => {
                dispatch(getEditUserCreateError(error))
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
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)


    }
    return fetch('https://localhost/users', requestOptions)
        .then(handleEditResponse)
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
            console.log("User Created")
            return{
                response
            }
        }
    })
}

export default connect(mapStateToProps)





