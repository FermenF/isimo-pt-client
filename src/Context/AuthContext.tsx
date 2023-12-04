import React, { createContext, ReactNode, useState } from 'react';
import { AuthContextType } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import { authProfile } from '@services/auth.service';
import { getMessageError } from '@utils/axiosApiErrors';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {

    const tokenSaved = window.localStorage.getItem('authToken');
    const userSaved  = window.localStorage.getItem('userAuthenticated');

    const [authToken, setAuthToken] = useState<string | null>(tokenSaved || "");
    const [user, setUser] = useState<User | null>(userSaved ? JSON.parse(userSaved): null);

    const performLogin = async (token: string) => {
        setAuthToken(token);
        localStorage.setItem('authToken', token);
        getUserFromToken(token);
    };

    const performLogout = () => {
        setAuthToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userAuthenticated');
        setUser(null);
    };

    const getUserFromToken = async (token: string) => {
        try {
            const user = await authProfile(token);
            window.localStorage.setItem('userAuthenticated', JSON.stringify(user.data));
            setUser(user.data as User);
        } catch (error) {
            throw getMessageError(error);
        }
    };

    const authContextValue: AuthContextType = {
        authToken,
        performLogin,
        performLogout,
        user
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
