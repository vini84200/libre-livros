import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import useUser from "../../hooks/useUser";

export default function Navigation() {
    return (
        <div className="bg-green-400 flex flex-row justify-between">
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
    const [user] = useUser();

    if (user.isAnonymous) {
        return <PageLink link={link} title={title} />;
    }
}

function HomePageLink() {
    const [user] = useUser();
    if (user.isAnonymous) {
        return <PageLink link={ROUTES.LANDING} title="Home" />;
    }
    return <PageLink link={ROUTES.HOME} title="Home" />;
}

function LoginLogoutButton() {
    const [user, userApi] = useUser();
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
                onClick={userApi.logout}
            >
                Logout
            </button>
        </li>
    );
}
