import React from "react";
import { useSelector } from "react-redux";

import Navigation from "../../components/Navigation";

export default function Home() {
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <Navigation />
            <div className="container mx-auto bg-green-100 h-screen px-4 pt-5">
                <h2 className="text-gray-700 font-semibold text-2xl">
                    Bem vindo de volta, {user.display_name || user.email}
                </h2>
            </div>
        </>
    );
}
