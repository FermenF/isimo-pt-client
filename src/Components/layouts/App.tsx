import { useAuth } from "@hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import AlertResponse from "@components/AlertResponse";

const App: React.FC = () => {

    const { authToken } = useAuth();

    if (!authToken) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='bg-gray-100 overflow-y-hidden min-h-screen'>
            <NavBar />
            <AlertResponse />
            <div className="mt-[4.5rem] h-full">
                <div className="w-full lg:w-1/2 mx-auto">
                    <div className="h-full p-2 md:p-5">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;