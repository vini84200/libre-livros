import { action } from "typesafe-actions";

export const types = {
    // Login
    REQUEST_LOGIN_DEFAULT: "@user/request_login_default",
    LOGIN_STATE_CHANGED: "@user/login_state_changed",
    ERROR_LOGIN: "@user/error_login",
    // Logout
    REQUEST_LOGOUT: "@user/request_logout",
    // Dislay name change
    REQUEST_CHANGE_DISPLAYNAME: "@user/request_change_displayname",
    CHANGE_DISPLAYNAME: "@user/change_displayname",
};

// Login
const requestLoginDefault = (email, password) =>
    action(types.REQUEST_LOGIN_DEFAULT, { email, password });
const loginStateChanged = (user) => action(types.LOGIN_STATE_CHANGED, { user });
const errorLogin = (errors) => action(types.ERROR_LOGIN, { errors });
// Logout
const requestLogout = () => action(types.REQUEST_LOGOUT);

// Display Change Name
const requsetChangeDisplayName = (newName) =>
    action(types.REQUEST_CHANGE_DISPLAYNAME, { newName });
const changeDisplayName = (newName) =>
    action(types.CHANGE_DISPLAYNAME, { newName });

export const actions = {
    requestLoginDefault,
    errorLogin,
    loginStateChanged,
    requestLogout,
    requsetChangeDisplayName,
    changeDisplayName,
};
