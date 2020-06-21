import { put, takeLatest, apply, take, fork, call } from "redux-saga/effects";

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

function* changeDisplayName() {
    while (true) {
        try {
            const action = yield take(types.REQUEST_CHANGE_DISPLAYNAME);
            const user = fb.auth.currentUser;
            if (user != null) {
                yield apply(user, user.updateProfile, [
                    {
                        displayName: action.payload.newName,
                    },
                ]);
                yield put(actions.changeDisplayName(action.payload.newName));
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export default function* saga() {
    yield takeLatest(types.REQUEST_LOGIN_DEFAULT, doLogin);
    yield takeLatest(types.REQUEST_LOGOUT, doLogout);
    yield fork(changeDisplayName);
}
