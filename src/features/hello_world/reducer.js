import { types } from "./actions";

export default function reducer(state = "Inited", action) {
    switch (action.type) {
        case types.RECIEVE_HELLO_WORLD:
            return action.payload.text;
        default:
            return state;
    }
}
