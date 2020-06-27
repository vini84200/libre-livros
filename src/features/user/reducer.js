import { types } from "./actions";

export const ANONYMOUS_USER = {
    isAnonymous: true,
};
const INITIAL_STATE = {
    user: ANONYMOUS_USER,
    loading: false,
    err: {
        login: null,
        logout: null,
        change_displayname: null,
    },
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGIN.REQUEST_USERNAME_PASSWORD:
            return {
                ...state,
                loading: true,
                errors: { ...state.err, login: null },
            };
        case types.LOGIN.ERROR:
            return {
                ...state,
                loading: false,
                err: { ...state.err, login: action.payload.errors },
            };
        case types.LOGIN.SUCCESS:
            return {
                ...state,
                loading: false,
                errors: { ...state.err, login: null },
                user: action.payload.user,
            };
        case types.LOGOUT.REQUEST:
            return {
                ...state,
                loading: true,
                errors: { ...state.err, logout: null },
            };
        case types.LOGOUT.SUCCESS:
            return {
                ...state,
                loading: false,
                user: ANONYMOUS_USER,
                errors: { ...state.err, logout: null },
            };
        case types.LOGOUT.ERROR:
            return {
                ...state,
                errors: { ...state.err, logout: action.payload.errors },
            };
        case types.DISPLAY_NAME.SUCCESS_CHANGE:
            return {
                ...state,
            };

        default:
            return state;
    }
}
