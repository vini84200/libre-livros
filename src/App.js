/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// Paginas

import Home from "./pages/home";
import SignIn from "./pages/SignIn";
//
import * as ROUTES from "./constants/routes";
import "./App.css";
import Landing from "./pages/landing";
import useUser from "./hooks/useUser";

function App() {
    return (
        <Router>
            <div>
                <Route exact path={ROUTES.LANDING} component={Landing} />
                <LoginRoute path={ROUTES.SIGN_IN} component={SignIn} />

                <PrivateRoute path={ROUTES.HOME} component={Home} />
            </div>
        </Router>
    );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [{ isAnonymous }] = useUser();
    return (
        <Route
            {...rest}
            render={(props) =>
                isAnonymous === false ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={ROUTES.SIGN_IN} />
                )
            }
        />
    );
};

const LoginRoute = ({ component: Component, ...rest }) => {
    const [{ isAnonymous }] = useUser();
    return (
        <Route
            {...rest}
            render={(props) =>
                isAnonymous === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={ROUTES.HOME} />
                )
            }
        />
    );
};

export default App;
