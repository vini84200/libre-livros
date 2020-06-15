import { all } from "redux-saga/effects";

import counterReducer from "./counter/reducer";

import helloWorldReducer from "./hello_world/reducer";
import helloWorldSaga from "./hello_world/saga";

export const rootReducer = {
    counter: counterReducer,
    hello_world: helloWorldReducer,
};

export function* rootSaga() {
    yield all([helloWorldSaga()]);
}
