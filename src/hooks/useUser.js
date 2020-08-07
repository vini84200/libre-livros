import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";

import { actions } from "../features/user/actions";

export default function useUser() {
    const { user, loading, err } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const api = useMemo(
        () => ({
            login: (email, password) =>
                dispatch(
                    actions.loginActions.requestLoginDefault(email, password)
                ),
            changeUserName: (newName) =>
                dispatch(
                    actions.displayNameActions.requsetChangeDisplayName(newName)
                ),
            logout: () => dispatch(actions.logoutActions.requestLogout()),
        }),
        [dispatch]
    );

    return [user, api, { loading, err }];
}
