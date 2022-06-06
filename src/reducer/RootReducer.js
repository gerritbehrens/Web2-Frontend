import * as AuthenticationsActions from "../actions/AuthenticationsActions";

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    error: null
};
function rootReducer(state = initialState, action) {

    console.log("Bin im Reducer " + action.type)

    switch (action.type) {
        case AuthenticationsActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case AuthenticationsActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null
            }
        default:
            return state;
    }
};
export default rootReducer;