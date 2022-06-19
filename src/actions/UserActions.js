
export const SHOW_USER_DIALOG = "SHOW_USER_DIALOG"
export const HIDE_USER_DIALOG = "HIDE_USER_DIALOG"

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






