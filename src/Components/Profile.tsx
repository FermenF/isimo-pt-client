import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { capitalizeText } from '@utils/string.utils';
import { IoMdExit } from 'react-icons/io';
import { authLogout } from '@services/auth.service';
import { getMessageError } from '@utils/axiosApiErrors';

interface ProfileProps {
    name: string | undefined;
}

const Profile: React.FC<ProfileProps> = ({ name }) => {

    const { performLogout, authToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        try {
            if(authToken){
                authLogout(authToken);
            }
        } catch (error) {
            getMessageError(error);
        }
        performLogout();
        navigate("/login");
    };

    return (
        <div className="absolute w-80 right-0 z-50 rounded-md shadow-2xl bg-gray-50 p-2">
            <div className="p-1.5">
                <Link to={"#"} className="font-semibold text-blue-600 hover:text-blue-900">{ capitalizeText(name) }</Link>
            </div>
            <hr />
            <button type="button" className="hover:bg-gray-200 p-3 w-full text-left rounded-md flex items-center" onClick={ handleLogout }>
                <IoMdExit />
                <span className="ml-1 font-semibold">Logout</span>
            </button>
        </div>
    );
};

export default Profile;