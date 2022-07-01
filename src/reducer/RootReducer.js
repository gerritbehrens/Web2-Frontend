import * as authenticationActions from "../actions/AuthenticationsActions";
import * as userActions from "../actions/UserActions"
import * as deleteUserActions from "../actions/DeleteUserAction"
import * as editUserAction from "../actions/EditUserActions";
import * as forumActions from "../actions/ForumActions";

const initialState = {
    user: null,
    users: [],
    forums: [],
    userToEdit: null,
    loginPending: false,
    showLoginDialog: false,
    showUserDialog: false,
    showUserEditDialog: false,
    showUserDeleteDialog: false,
    error: null,
    createPending: false,
    editPending: false,
    deletePending: false,
    userToDelete: null,
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
                showUserDialog: true,
            }
        case userActions.HIDE_USER_DIALOG:
            return{
                ...state,
                showUserDialog: false,
                createPending: false,
                error: null
            }
        case userActions.CREATE_USER_PENDING:
            return{
                ...state,
                createPending: true
            }
        case userActions.CREATE_USER_ERROR:
            return{
                ...state,
                error: action.error,
                createPending: false
            }
        case deleteUserActions.DELETE_USER_SHOW:
            return{
                ...state,
                showUserDeleteDialog: true,
                userToDelete: action.payload
            }
        case deleteUserActions.DELETE_USER_PENDING:
            return{
                ...state,
                deletePending: true
            }
        case deleteUserActions.DELETE_USER_ERROR:
            return{
                ...state,
                error: action.payload
            }
        case deleteUserActions.DELETE_USER_HIDE:
            return{
                ...state,
                showUserDeleteDialog: false,
                userToDelete: null,
                error: null,
            }
       // case editUserAction.SHOW_EDIT_USER_DIALOG:
       //      console.log("Show-Edit-Dialog")
       //      return{
       //          ...state,
       //          showUserEditDialog: true,
       //      }
       //  case editUserAction.HIDE_EDIT_USER_DIALOG:
       //      return{
       //          ...state,
       //          showUserEditDialog: false
       //      }
       // case editUserAction.EDIT_USER_ERROR:
       //          return {
       //              ...state,
       //              error: action.payload
       //          }
        case userActions.GET_ALL_USERS:
            return{
                ...state,
                users: action.users,
                createPending: false,
                editPending: false,
                deletePending: false
            }
        case forumActions.GET_ALL_FORUMS:
            return{
                ...state,
                forums: action.forums
            }
        case userActions.UPDATE_USER_MANAGEMENT_FINISHED:
            console.log(action.payload.updatePage)
            return{
                ...state,
                updatePage: false
            }
        default:
            return state;
    }
};
export default rootReducer;