import React from "react";
import app from "firebase/app";
import "firebase/auth";
import store from "../app";
import { actions as userActions } from "../features/user/actions";
import { ANONYMOUS_USER } from "../features/user/reducer";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

function onAuthStateChanged(user) {
    if (!user) {
        store.dispatch(userActions.loginStateChanged(ANONYMOUS_USER));
        return;
    }
    store.dispatch(userActions.loginStateChanged(user));
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        console.log("Created Firebase Connector");
        this.auth.onAuthStateChanged(onAuthStateChanged);
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) =>
        this.auth.currentUser.updatePassword(password);
}

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

export default Firebase;

const fb = new Firebase();

export { FirebaseContext, fb, authErrors };
