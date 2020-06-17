import { action } from "typesafe-actions";

export const types = {
    //    REQUEST_HELLO_W: "@hello_world/REQUEST_HELLO_WORLD",
    REQUEST_LOGIN_DEFAULT: "@user/request_login_default",
    SUCCESS_LOGIN: "@user/success_login",
    ERROR_LOGIN: "@user/error_login",
    LOGIN_STATE_CHANGED: "@user/login_state_changed",
    REQUEST_LOGOUT: "@user/request_logout",
};

// const requestHelloWorld = () => action(types.REQUEST_HELLO_WORLD);
const requestLoginDefault = (email, password) =>
    action(types.REQUEST_LOGIN_DEFAULT, { email, password });

const successLogin = (user) => action(types.SUCCESS_LOGIN, { user });
const errorLogin = (errors) => action(types.ERROR_LOGIN, { errors });
const loginStateChanged = (user) => action(types.LOGIN_STATE_CHANGED, { user });
const requestLogout = () => action(types.REQUEST_LOGOUT);

export const actions = {
    requestLoginDefault,
    successLogin,
    errorLogin,
    loginStateChanged,
    requestLogout,
};