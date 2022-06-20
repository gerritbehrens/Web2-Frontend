import * as authenticationActions from "../actions/AuthenticationsActions";
import * as userActions from "../actions/UserActions"
import * as editUserActions from "../actions/EditUserActions";

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    showUserDialog: false,
    showUserEditDialog: false,
    error: null
};
function rootReducer(state = initialState, action) {

    console.log("Bin im Reducer " + action.type)

    switch (action.type) {
        case authenticationActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case authenticationActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null
            }
        case authenticationActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case authenticationActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                pending: false,
                userID: action.userID,
                accessToken: action.accessToken
            }
        case authenticationActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                pending: false,
                error: "Authentication failed"
            }
        case authenticationActions.LOGOUT_USER:
            return {
                ...state,
                user: null,
                accessToken: null
            }
        case userActions.SHOW_USER_DIALOG:
            return{
                ...state,
                showUserDialog: true
            }
        case userActions.HIDE_USER_DIALOG:
            return{
                ...state,
                showUserDialog: false
            }
        case editUserActions.SHOW_EDIT_USER_DIALOG:
            return{
                ...state,
                showUserEditDialog: true
            }
        case editUserActions.HIDE_EDIT_USER_DIALOG:
            return{
                ...state,
                showUserEditDialog: false
            }
        default:
            return state;
    }
};
export default rootReducer;