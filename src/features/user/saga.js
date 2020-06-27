import { put, takeLatest, take, fork, call } from "redux-saga/effects";

import { types, actions } from "./actions";
import { rsf, authErrors } from "../../utils/firebaseUtils";

//  *** LOGIN and LOGOUT ***

function* doLogin(action) {
    try {
        yield call(
            rsf.auth.signInWithEmailAndPassword,
            action.payload.email,
            action.payload.password
        );
        // successful login will trigger the loginStatusWatcher, which will update the state
    } catch (e) {
        if (e.code) {
            yield put(
                actions.loginActions.errorLogin({
                    ...e,
                    message: authErrors(e.code),
                })
            );
        } else {
            yield put(
                actions.loginActions.errorLogin({
                    ...e,
                    message: `Erro desconhecido:${String(e)}`,
                })
            );
        }
    }
}

function* doLogout() {
    try {
        yield call(rsf.auth.signOut);
        // successful login will trigger the loginStatusWatcher, which will update the state
    } catch (e) {
        yield put(actions.logoutActions.errorLogout(e));
    }
}

function* loginStatusWatcher() {
    const channel = yield call(rsf.auth.channel);

    while (true) {
        const { user } = yield take(channel);

        if (user) yield put(actions.loginActions.successLogin(user));
        else yield put(actions.logoutActions.successLogout());
    }
}

//  *** CHANGE DISPLAY NAME ***

function* changeDisplayName() {
    while (true) {
        try {
            const action = yield take(types.DISPLAY_NAME.REQUEST_CHANGE);

            yield call(rsf.auth.updateProfile, {
                displayName: action.payload.newName,
            });
            yield put(
                actions.displayNameActions.successChangeDisplayName(
                    action.payload.newName
                )
            );
        } catch (e) {
            actions.displayNameActions.errorChangeDisplayName(e);
        }
    }
}

//  *** MAIN SAGA FOR USER ACTIONS ***

export default function* saga() {
    yield takeLatest(types.LOGIN.REQUEST_USERNAME_PASSWORD, doLogin);
    yield takeLatest(types.LOGOUT.REQUEST, doLogout);
    yield fork(loginStatusWatcher);
    yield fork(changeDisplayName);
}
