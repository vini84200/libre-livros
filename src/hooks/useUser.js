import React, {
    useMemo,
    useState,
    createContext,
    useEffect,
    useContext,
} from "react";
import { fbApp } from "../utils/firebaseUtils";
import useError from "./useError";

const userContext = createContext({ user: { isAnonymous: true } });

export const useAuth = () => {
    const [state, setState] = useState(() => {
        const user = fbApp.auth().currentUser || { isAnonymous: true };
        return { initializing: !user, user };
    });
    function onChange(user) {
        setState({ initializing: false, user: user || { isAnonymous: true } });
    }

    function updateUser() {
        onChange(fbApp.auth().currentUser);
    }

    useEffect(() => {
        // listen for auth state changes
        const unsubscribe = fbApp.auth().onAuthStateChanged(onChange);
        // unsubscribe to the listener when unmounting
        return () => unsubscribe();
    }, []);

    return { ...state, updateUser };
};

export const ProvideAuth = ({ children }) => {
    const auth = useAuth();
    return (
        <userContext.Provider value={auth}> {children}</userContext.Provider>
    );
};

export default function useUser() {
    // const { user, loading, err } = useSelector((state) => state.user);
    const { user, initializing, updateUser } = useContext(userContext);

    const [error, throwError] = useError();

    const api = useMemo(
        () => ({
            login: (email, password) =>
                fbApp
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .catch((e) => throwError(e)),
            changeUserName: (newName) =>
                user
                    .updateProfile({
                        displayName: newName,
                    })
                    .then(() => updateUser())
                    .catch((e) => throwError(e)),
            logout: () =>
                fbApp
                    .auth()
                    .signOut()
                    .catch((e) => throwError(e)),
        }),
        [updateUser, throwError, user]
    );

    return [user, api, { initializing, err: error }];
}
