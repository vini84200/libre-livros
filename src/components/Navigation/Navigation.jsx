import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as ROUTES from "../../constants/routes";
import { actions } from "../../features/user/actions";

export default function Navigation() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <div className="bg-green-400">
            <ul className="flex py-5 font-semibold">
                <li className="mx-5 text-lg text-gray-100">
                    <Link to={ROUTES.LANDING}>Home</Link>
                </li>
                <li className="mx-5 text-lg text-gray-100">
                    <Link to={ROUTES.SIGN_IN}>Entrar</Link>
                </li>
                {!user.isAnonymous && (
                    <li className="mx-5 text-lg text-gray-100 bg-green-700">
                        <button
                            type="button"
                            onClick={() => {
                                dispatch(actions.requestLogout());
                            }}
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}
