import { put, takeLatest } from "redux-saga/effects";

import { types, actions } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* helloWorld() {
    try {
        // do api call
        // const user = yield call(Api.fetchUser, action.payload.userId);
        yield put(actions.recieveHelloWorld("Ola mundo!"));
    } catch (e) {
        yield put(actions.recieveHelloWorld("Errored Hellow World!"));
    }
}
export default function* saga() {
    yield takeLatest(types.REQUEST_HELLO_WORLD, helloWorld);
}
