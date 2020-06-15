import { action } from "typesafe-actions";

export const types = {
    REQUEST_HELLO_WORLD: "@hello_world/REQUEST_HELLO_WORLD",
    RECIEVE_HELLO_WORLD: "@hello_world/RECIEVE_HELLO_WORLD",
};

const requestHelloWorld = () => action(types.REQUEST_HELLO_WORLD);
const recieveHelloWorld = (text) => action(types.RECIEVE_HELLO_WORLD, { text });

export const actions = { requestHelloWorld, recieveHelloWorld };
