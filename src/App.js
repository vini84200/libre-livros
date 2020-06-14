import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Paginas

import Home from "./pages/home";
import SignUp from "./pages/SignIn";
//
import * as ROUTES from "./constants/routes";
import "./App.css";

function App() {
    return (
        <Router>
            <div>
                <Route exact path={ROUTES.LANDING} component={Home} />
                <Route exact path={ROUTES.SIGN_IN} component={SignUp} />
            </div>
        </Router>
    );
}

export default App;
