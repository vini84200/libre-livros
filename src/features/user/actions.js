import { action } from "typesafe-actions";

export const types = {
    REQUEST_LOGIN_DEFAULT: "@user/request_login_default",
    LOGIN_STATE_CHANGED: "@user/login_state_changed",
    ERROR_LOGIN: "@user/error_login",
    REQUEST_LOGOUT: "@user/request_logout",
};

// Login
const requestLoginDefault = (email, password) =>
    action(types.REQUEST_LOGIN_DEFAULT, { email, password });
const loginStateChanged = (user) => action(types.LOGIN_STATE_CHANGED, { user });
const errorLogin = (errors) => action(types.ERROR_LOGIN, { errors });
// Logout
const requestLogout = () => action(types.REQUEST_LOGOUT);

export const actions = {
    requestLoginDefault,
    errorLogin,
    loginStateChanged,
    requestLogout,
};
