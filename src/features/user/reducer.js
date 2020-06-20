import { types } from "./actions";

export const ANONYMOUS_USER = {
    isAnonymous: true,
};
const INITIAL_STATE = {
    user: ANONYMOUS_USER,
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
        case types.ERROR_LOGIN:
            return {
                ...state,
                loading: false,
                err: action.payload.errors,
            };
        case types.LOGIN_STATE_CHANGED:
            return {
                ...state,
                loading: false,
                errors: {},
                user: action.payload.user,
            };

        default:
            return state;
    }
}
