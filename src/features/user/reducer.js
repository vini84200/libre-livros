import { types } from "./actions";

const INITIAL_STATE = {
    user: {
        isAnonymous: true,
    },
    loading: false,
    err: {},
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.REQUEST_LOGIN_DEFAULT:
            return {
                ...state,
                loading: true,
            };
        case types.SUCCESS_LOGIN:
            return {
                ...state,
                loading: false,
                errors: {},
                user: action.payload.user.user,
            };
        case types.ERROR_LOGIN:
            return {
                ...state,
                loading: false,
                err: action.payload.errors,
            };
        case types.RELOGIN:
            return {
                ...state,
                loading: false,
                errors: {},
                user: action.payload.user.user,
            };
        default:
            return state;
    }
}
