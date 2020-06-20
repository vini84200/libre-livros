import { put, takeLatest, apply } from "redux-saga/effects";

import { types, actions } from "./actions";
import { fb, authErrors } from "../../utils/firebaseUtils";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* doLogin(action) {
    try {
        // do api call
        yield apply(fb, fb.doSignInWithEmailAndPassword, [
            action.payload.email,
            action.payload.password,
        ]);
    } catch (e) {
        if (e.code) {
            yield put(
                actions.errorLogin({
                    ...e,
                    message: authErrors(e.code),
                })
            );
        } else {
            yield put(
                actions.errorLogin({
                    ...e,
                    message: `Erro desconhecido:${String(e)}`,
                })
            );
        }
    }
}

function* doLogout() {
    try {
        yield apply(fb, fb.doSignOut);
    } catch (e) {
        console.error(e);
    }
}

export default function* saga() {
    yield takeLatest(types.REQUEST_LOGIN_DEFAULT, doLogin);
    yield takeLatest(types.REQUEST_LOGOUT, doLogout);
}
