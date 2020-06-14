import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
    <div className="container mx-auto bg-green-100 h-screen px-4 pt-5">
        <h1 className="text-2xl text-gray-800">SignUp</h1>
        <SignUpForm />
    </div>
);

class SignUpForm extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (event) => {};

    onChange = (event) => {};

    render() {
        return <form onSubmit={this.onSubmit}></form>;
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
