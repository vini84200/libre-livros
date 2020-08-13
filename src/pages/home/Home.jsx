import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FiCheck, FiX, FiEdit3, FiAlertTriangle } from "react-icons/fi";
import Navigation from "../../components/Navigation";
import useUser from "../../hooks/useUser";

import BookLine from "../../components/molecules/BookLine/BookLine";
import TodosLivros from "../../components/organisms/TodosLivros/TodosLivros";

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <Navigation />
            <div className="container mx-auto bg-green-100 flex-1 px-4 pt-5">
                <Greetings />
                <TodosLivros />
            </div>
        </div>
    );
}

const displayNameSchema = Yup.object().shape({
    displayName: Yup.string()
        .required()
        .notOneOf(["admin"], "Esta nome está reservado"),
});

function Greetings() {
    const [user, userApi] = useUser();
    const [editing, changeEditing] = useState(false);

    return (
        <h2 className="text-gray-700 font-semibold text-2xl">
            Bem vindo de volta,{" "}
            {!editing ? (
                <>
                    {user.displayName || user.email}
                    <button
                        type="button"
                        onClick={() => {
                            changeEditing(true);
                        }}
                    >
                        <FiEdit3 className="m-0 h-6 -mb-1" />
                    </button>
                </>
            ) : (
                <Formik
                    initialValues={{
                        displayName: user.displayName || user.email,
                    }}
                    validationSchema={displayNameSchema}
                    onSubmit={(values, acts) => {
                        userApi.changeUserName(values.displayName);
                        acts.setSubmitting(false);
                        changeEditing(false);
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
                        <>
                            <form
                                className={`border-b-2 border-gray-400 w-full inline ${
                                    errors.displayName
                                        ? "focus-within:border-red-500"
                                        : "focus-within:border-green-500"
                                }`}
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    className="appearance-none bg-transparent text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    name="displayName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.displayName}
                                />

                                <button type="submit">
                                    <FiCheck />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => changeEditing(false)}
                                >
                                    <FiX />
                                </button>
                                {errors.displayName && (
                                    <span className="text-xs text-red-700 flex flex-row">
                                        <FiAlertTriangle className="mr-4" />{" "}
                                        {errors.displayName}
                                    </span>
                                )}
                            </form>
                        </>
                    )}
                </Formik>
            )}
        </h2>
    );
}
