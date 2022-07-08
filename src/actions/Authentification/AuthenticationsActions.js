
export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG"
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG"

export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING"
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS"
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"

export const LOGOUT_USER = "LOGOUT_USER"

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticateUserPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticateUserSuccessAction(userSession) {
    return {
        type: AUTHENTICATION_SUCCESS,
        userID: userSession.userID,
        accessToken: userSession.accessToken
    }
}

export function getAuthenticateUserErrorAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function getLogoutUserAction(){

	return {
		type: LOGOUT_USER,
        userID: '',
        accessToken: ''
	}
}

export function authenticateUser(userID, password) {
    return dispatch => {
        dispatch(getAuthenticateUserPendingAction())
        login(userID, password)
            .then(
                userSession => {
                    //To call User by ID in WelcomeMessage
                    userSession.userID = userID
                    const action = getAuthenticateUserSuccessAction(userSession)
                    dispatch(action)
                },
                error => {
                    dispatch(getAuthenticateUserErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getAuthenticateUserErrorAction(error))
            })
    }
}

function login(userID, password) {
    const base64credentials = btoa(userID + ":" + password);
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type'  : 'application/json',
                   'Authorization' : 'Basic ' + base64credentials }
        
    }
    return fetch('https://localhost/authenticate', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession
        })
}

function handleResponse(response){

    const authorizationHeader = response.headers.get("Authorization")

    return response.text().then(() => {

        let token

        if(authorizationHeader){
            token = authorizationHeader.split(" ")[1]
        }

        if(!response.ok){
            if(response.status === 401){
                logout()
            }
            const error = response.statusText
            return Promise.reject(error)
        } else {
            return {
                accessToken: token
            }
        }
    })
}

function logout() {
    return dispatch => {
		dispatch(getLogoutUserAction())
	}
}

