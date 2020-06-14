import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export default function Navigation() {
    return (
        <div className="bg-green-400">
            <ul className="flex py-5 font-semibold">
                <li className="mx-5 text-lg text-gray-100">
                    <Link to={ROUTES.LANDING}>Home</Link>
                </li>
                <li className="mx-5 text-lg text-gray-100">
                    <Link to={ROUTES.SIGN_IN}>Entrar</Link>
                </li>
            </ul>
        </div>
    );
}
