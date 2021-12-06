import { createContext } from "react";

export const AppContext = createContext({
    globalLoading: false,
    setGlobalLoading: () => {},
    userInfo: {
        token: '',
        username: '',
        userRole: '',
    },
});