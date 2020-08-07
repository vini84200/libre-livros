import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import useUser from "../../hooks/useUser";

const SignInPage = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-green-600 lg:min-h-screen lg:flex lg:items-center p-8 sm:p-12">
            <div className="flex-grow">
                <h1 className="text-white text-center text-2xl sm:text-5xl">
                    Seja bem-vindo(a)!
                </h1>
                <p className="text-center text-blue-200 sm:text-lg">
                    Entre para começar...
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

const signInSchema = Yup.object().shape({
    email: Yup.string()
        .email("Deve ser um email válido.")
        .required("Este campo é obrigatório."),
    password: Yup.string().required("Precisamos de sua senha..."),
});

function SignInForm() {
    const [user, userApi, { loading, err }] = useUser();
    const history = useHistory();

    useEffect(() => {
        if (!user.isAnonymous) {
            history.push(ROUTES.HOME);
        }
    }, [user, history]);

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={signInSchema}
            onSubmit={(values, acts) => {
                userApi.login(values.email, values.password);
                acts.setSubmitting(false);
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
            }) => (
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
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
                        disabled={isSubmitting || loading}
                        className="flex-shrink-0 btn-green mt-4"
                    >
                        Entrar
                    </button>
                    {err.login && (
                        <span className="text-red-600">
                            {err.login.message}
                        </span>
                    )}
                </form>
            )}
        </Formik>
    );
}

export default SignInPage;

export { SignInForm };
