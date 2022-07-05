import * as authenticationActions from "../actions/AuthenticationsActions";
import * as userActions from "../actions/UserActions"
import * as deleteUserActions from "../actions/DeleteUserAction"
import * as forumActions from "../actions/ForumActions";
import * as deleteForumActions from "../actions/DeleteForumActions";
import * as messageActions from "../actions/MessageActions"

const initialState = {
    userID: null,
    users: [],
    forums: [],
    messages: [],
    forum: null,
    loginPending: false,
    showLoginDialog: false,
    showUserDialog: false,
    showUserDeleteDialog: false,
    showForumDeleteDialog: false,
    error: null,
    createPending: false,
    createForumPending: false,
    deleteUserPending: false,
    deleteForumPending: false,
    userToDelete: null,
    forumToDelete: null
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
                deleteUserPending: true
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
        case deleteForumActions.DELETE_FORUM_SHOW:
            return {
                ...state,
                showForumDeleteDialog: true,
                forumToDelete: action.payload
            }
        case deleteForumActions.DELETE_FORUM_PENDING:
            return{
                ...state,
                deleteForumPending: true
            }
        case deleteForumActions.DELETE_FORUM_ERROR:
            return{
                ...state,
                error: action.payload
            }
        case deleteForumActions.DELETE_FORUM_HIDE:
            return{
                ...state,
                showForumDeleteDialog: false,
                forumToDelete: null,
                error: null
            }
        case forumActions.CREATE_FORUM_PENDING:
            return{
                ...state,
                createForumPending: true
            }
        case forumActions.CREATE_FORUM_ERROR:
            return{
                ...state,
                error: action.payload
            }
        case userActions.GET_ALL_USERS:
            return{
                ...state,
                users: action.users,
                createPending: false,
                deleteUserPending: false,
            }
        case forumActions.GET_ALL_FORUMS:
            return{
                ...state,
                forums: action.payload,
                createForumPending: false,
                deleteForumPending: false,
                forum: null
            }
        case forumActions.SET_FORUM:
            console.log("I set the forum")
            return{
                ...state,
                forum: action.payload
            }
        case messageActions.GET_ALL_MESSAGES:
            console.log(action.payload)
            return{
                ...state,
                messages: action.payload
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