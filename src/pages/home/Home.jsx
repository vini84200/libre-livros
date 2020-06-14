import React, { Fragment } from "react";

import useCount from "../../hooks/useCount";
import useTheme from "../../hooks/useTheme";
import Navigation from "../../components/Navigation";

export default function Home() {
    const [count, { increment }] = useCount();
    const [, { toggle }] = useTheme();
    return (
        <>
            <Navigation />
            <div className="container mx-auto bg-green-100 h-screen px-4 pt-5">
                {" "}
            </div>
        </>
    );
}
