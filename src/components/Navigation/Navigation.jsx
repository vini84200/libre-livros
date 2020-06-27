import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as ROUTES from "../../constants/routes";
import { actions } from "../../features/user/actions";

export default function Navigation() {
    return (
        <div className="bg-green-400 shadow-lg flex flex-row justify-between">
            <ul className="flex py-5 font-semibold">
                <HomePageLink />
            </ul>
            <ul className="flex py-5 font-semibold ">
                <LoginLogoutButton />
            </ul>
        </div>
    );
}

function PageLink({ link, title }) {
    return (
        <li className="mx-5 text-lg text-gray-100">
            <Link to={link}>{title}</Link>
        </li>
    );
}

function LoggedOnlyPageLink({ link, title }) {
    const { user } = useSelector((state) => state.user);
    if (user.isAnonymous) {
        return <PageLink link={link} title={title} />;
    }
}

function HomePageLink() {
    const { user } = useSelector((state) => state.user);
    if (user.isAnonymous) {
        return <PageLink link={ROUTES.LANDING} title="Home" />;
    }
    return <PageLink link={ROUTES.HOME} title="Home" />;
}

function LoginLogoutButton() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    if (user.isAnonymous) {
        return (
            <li className="mx-5 text-lg text-gray-100 rounded-full border border-gray-100 px-4 bg-green-800">
                <Link to={ROUTES.SIGN_IN}>Entrar</Link>
            </li>
        );
    }
    return (
        <li className="mx-5 text-lg text-gray-100">
            <button
                type="button"
                className="mx-5 text-lg text-gray-100 rounded-full border border-gray-100 px-4 bg-green-800"
                onClick={() => {
                    dispatch(actions.logoutActions.requestLogout());
                }}
            >
                Logout
            </button>
        </li>
    );
}
