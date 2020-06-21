import React, { useState } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { FiCheck, FiX, FiEdit3 } from "react-icons/fi";
import Navigation from "../../components/Navigation";
import { actions } from "../../features/user/actions";

export default function Home() {
    return (
        <>
            <Navigation />
            <div className="container mx-auto bg-green-100 h-screen px-4 pt-5">
                <Greetings />
            </div>
        </>
    );
}

const displayNameSchema = Yup.object().shape({
    displayName: Yup.string().required().notOneOf(["admin"]),
});

function Greetings() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
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
                    onSubmit={(values, acts) => {
                        dispatch(
                            actions.requsetChangeDisplayName(values.displayName)
                        );

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
                        <form
                            className={`border-b-2 border-gray-400 w-auto inline ${
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
                                value={values.email}
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
                        </form>
                    )}
                </Formik>
            )}
        </h2>
    );
}
