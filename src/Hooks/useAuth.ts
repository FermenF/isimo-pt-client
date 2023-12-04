import { useContext } from 'react';
import AuthContext from '@context/AuthContext';
import { AuthContextType } from '@interfaces/auth.interface';

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthContextProvider');
    }
    return context;
};
