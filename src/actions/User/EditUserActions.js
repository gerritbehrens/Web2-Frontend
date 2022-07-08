import {connect} from "react-redux";
import * as UserActions from "./UserActions";
import {getAllUsers} from "./UserActions";

export const EDIT_USER_PENDING = "EDIT_USER_PENDING"
export const EDIT_USER_ERROR   = "EDIT_USER_ERROR"

const mapStateToProps = state => {
    return state
}

export function getEditUserPending() {
    return{
        type: EDIT_USER_PENDING
    }
}

export function getEditUserCreateError(error){
    return{
        type: EDIT_USER_ERROR,
        error: error
    }
}

export function updateUser(userID, userName, password, isAdministrator, token){
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





