import { action } from "typesafe-actions";

export const types = {
    //    REQUEST_HELLO_W: "@hello_world/REQUEST_HELLO_WORLD",
    REQUEST_LOGIN_DEFAULT: "@user/request_login_default",
    SUCCESS_LOGIN: "@user/success_login",
    RELOGIN: "@user/relogin",
    ERROR_LOGIN: "@user/error_login",
};

// const requestHelloWorld = () => action(types.REQUEST_HELLO_WORLD);
const requestLoginDefault = (email, password) =>
    action(types.REQUEST_LOGIN_DEFAULT, { email, password });

const successLogin = (user) => action(types.SUCCESS_LOGIN, { user });
const relogin = (user) => action(types.RELOGIN, { user });
const errorLogin = (errors) => action(types.ERROR_LOGIN, { errors });

export const actions = {
    requestLoginDefault,
    successLogin,
    errorLogin,
    relogin,
};
