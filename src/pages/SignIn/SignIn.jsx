import React, { Component } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-green-600 lg:min-h-screen lg:flex lg:items-center p-8 sm:p-12">
            <div className="flex-grow">
                <h1 className="text-white text-center text-2xl sm:text-5xl">
                    Seja bem-vindo(a)
                </h1>
                <p className="text-center text-blue-200 sm:text-lg">
                    Entre para começar
                </p>
            </div>
        </div>

        <div className="lg:min-h-screen lg:flex lg:items-center p-12 lg:p-24 xl:p-48">
            <div className="flex-grow bg-white shadow-xl rounded-md border border-gray-300 p-8">
                <SignInForm />
            </div>
        </div>
    </div>
);

class SignInForm extends Component {
    onSubmit = (event) => {};

    onChange = (event) => {};

    render() {
        return (
            <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "O email é obrigatório";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = "O email precisa ser válido";
                    }
                    if (!values.password) {
                        errors.password = "A senha é necessaria";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full"
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="Seu Email"
                            className="flex-full w-full text-gray-700 bg-gray-200
                                rounded-md hover:bg-white border border-gray-200 focus:outline-none focus:bg-white py-2 px-4 mt-4 outline-none"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email}
                            </span>
                        )}
                        <input
                            type="password"
                            name="password"
                            placeholder="Sua Senha"
                            className="flex-full w-full text-gray-700 bg-gray-200
                        rounded-md hover:bg-white border border-gray-200 focus:outline-none focus:bg-white py-2 px-4 mt-4"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password}
                            </span>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-shrink-0 btn-green mt-4"
                        >
                            Entrar
                        </button>
                    </form>
                )}
            </Formik>
        );
    }
}

export default SignInPage;

export { SignInForm };
