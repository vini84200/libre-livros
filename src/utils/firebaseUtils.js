import React from "react";
import app from "firebase/app";
import ReduxSagaFirebase from "redux-saga-firebase";
import "firebase/auth";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const fbApp = app.initializeApp(config);
const rsf = new ReduxSagaFirebase(fbApp);

const FirebaseContext = React.createContext(null);

const authErrors = (code) => {
    const list = {
        "auth/user-not-found": "O usuario não foi encontrado.",
        "auth/wrong-password": "A senha está incorreta.",
    };
    if (list[code]) {
        return list[code];
    }
    return `Errosd desconhecido:${code}`;
};

export default app;

export { FirebaseContext, fbApp, authErrors, rsf };
