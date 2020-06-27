import { action } from "typesafe-actions";

export const types = {
    LOGIN: {
        REQUEST_USERNAME_PASSWORD: "@user/request_login_username_password",
        SUCCESS: "@user/login_success",
        ERROR: "@user/error_login",
    },
    LOGOUT: {
        REQUEST: "@user/request_logout",
        SUCCESS: "@user/success_logout",
        ERROR: "@user/error_logout",
    },
    DISPLAY_NAME: {
        REQUEST_CHANGE: "@user/request_change_displayname",
        SUCCESS_CHANGE: "@user/success_change_displayname",
        ERROR_CHANGE: "@user/error_change",
    },
};

const loginActions = {
    requestLoginDefault: (email, password) =>
        action(types.LOGIN.REQUEST_USERNAME_PASSWORD, { email, password }),
    successLogin: (user) => action(types.LOGIN.SUCCESS, { user }),
    errorLogin: (errors) => action(types.LOGIN.ERROR, { errors }),
};

const logoutActions = {
    requestLogout: () => action(types.LOGOUT.REQUEST),
    successLogout: () => action(types.LOGOUT.SUCCESS),
    errorLogout: (errors) => action(types.LOGOUT.ERROR, { errors }),
};

// Display Change Name
const displayNameActions = {
    requsetChangeDisplayName: (newName) =>
        action(types.DISPLAY_NAME.REQUEST_CHANGE, { newName }),
    successChangeDisplayName: (newName) =>
        action(types.DISPLAY_NAME.SUCCESS_CHANGE, { newName }),
    errorChangeDisplayName: (errors) =>
        action(types.DISPLAY_NAME.ERROR_CHANGE, { errors }),
};

export const actions = {
    loginActions,
    logoutActions,
    displayNameActions,
};
