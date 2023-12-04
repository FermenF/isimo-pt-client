import { useAlert } from '@hooks/useAlerts';
import React, { useEffect } from 'react';
import { IoIosCloseCircle, IoMdCheckmarkCircle, IoMdInformation, IoMdTrash, IoMdWarning } from 'react-icons/io';

const AlertResponse: React.FC = () => {
    const { alerts, removeAlert } = useAlert();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (alerts.length > 0) {
                removeAlert(alerts[0].id);
            }
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [alerts, removeAlert]);

    return (
        <div className='fixed top-[5rem] right-2 z-50 w-72'>
            {alerts.map((alert) => (
                <div key={alert.id} className='flex items-center justify-between bg-slate-950 p-4 rounded-md mb-2'>
                    <div className="flex rounded items-center text-white" role="alert">
                        {alert.type === 'info' ? (
                            <IoMdInformation />
                        ) : alert.type === 'success' ? (
                            <IoMdCheckmarkCircle />
                        ) : alert.type === 'error' ? (
                            <IoMdTrash h={4} w={4} />
                        ) : alert.type === 'warning' ? (
                            <IoMdWarning h={4} w={4} />
                        ) : null}
                        <span className="sr-only">{alert.type}</span>
                        <div className="ms-3 text-sm font-medium">{alert.message}</div>
                    </div>
                    <button className='ml-2 text-white bg-red-700 rounded-md p-1' onClick={() => removeAlert(alert.id)}>
                        <IoIosCloseCircle />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AlertResponse;
