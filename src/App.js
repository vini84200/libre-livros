import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// Paginas

import Home from "./pages/home";
import SignUp from "./pages/SignIn";
//
import * as ROUTES from "./constants/routes";
import "./App.css";
import Landing from "./pages/landing";

function App() {
    return (
        <Router>
            <div>
                <Route exact path={ROUTES.LANDING} component={Landing} />
                <Route path={ROUTES.SIGN_IN} component={SignUp} />

                <ProtectedRoutes>
                    <Route path={ROUTES.HOME} component={Home} />
                </ProtectedRoutes>
            </div>
        </Router>
    );
}

function ProtectedRoutes(props) {
    const { user } = useSelector((state) => state.user);
    if (!user.isAnonymous) {
        return props.children;
    }
    return <></>;
}

export default App;
