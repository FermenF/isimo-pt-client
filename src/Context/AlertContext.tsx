import React, { createContext, ReactNode, useState } from 'react';

interface AlertContextProps {
    children: ReactNode;
}

interface Alert {
    id: number;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
}

interface AlertContextType {
    alerts: Alert[];
    addAlert: (type: 'success' | 'error' | 'info' | 'warning' , message: string) => void;
    removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<AlertContextProps> = ({ children }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const addAlert = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
        const id = new Date().getTime();
        setAlerts((prevAlerts) => [...prevAlerts, { id, type, message }]);
    };

    const removeAlert = (id: number) => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    };

    const contextValue: AlertContextType = {
        alerts,
        addAlert,
        removeAlert,
    };

    return <AlertContext.Provider value={contextValue}>{children}</AlertContext.Provider>;
};

export default AlertContext;