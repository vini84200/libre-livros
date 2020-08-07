import React, { useState } from "react";
import Navigation from "../../components/Navigation";

export default function Landing() {
    const [helloWorld, setHelloWorld] = useState("Inicio");

    return (
        <>
            <Navigation />
            <div className="container mx-auto bg-green-100 h-screen px-4 pt-5">
                {helloWorld}
                <button
                    type="button"
                    onClick={() => {
                        setHelloWorld("Hello World");
                    }}
                    className="btn btn-teal"
                >
                    Send
                </button>
            </div>
        </>
    );
}
