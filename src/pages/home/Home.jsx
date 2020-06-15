import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Navigation from "../../components/Navigation";

import { actions } from "../../features/hello_world/actions";

export default function Home() {
    const helloWorld = useSelector((state) => state.hello_world);
    const dispatch = useDispatch();

    return (
        <>
            <Navigation />
            <div className="container mx-auto bg-green-100 h-screen px-4 pt-5">
                {helloWorld}
                <button
                    type="button"
                    onClick={() => {
                        dispatch(actions.requestHelloWorld());
                    }}
                    className="btn btn-teal"
                >
                    Send
                </button>
            </div>
        </>
    );
}
