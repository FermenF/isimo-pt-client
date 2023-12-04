import axios from "axios";
import { AuthResponse } from "@interfaces/auth.interface";
import { apiUri } from "@config/api";
import { axiosHandleErrors } from "@utils/axiosApiErrors";

interface AuthProps {
    email:    string;
    password: string;    
};

// Login user
interface AutLoginProps extends AuthProps {

}

export const authLogin = async (credentials:AutLoginProps): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${ apiUri }/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw axiosHandleErrors(error);
    }
};

// Register new User
interface AuthRegisterProps extends AuthProps {
    name: string;
    password_confirmation: string;
}

export const authRegister = async (data: AuthRegisterProps): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${ apiUri }/auth/register`, data);
        return response.data;
    } catch (error) {
        throw axiosHandleErrors(error);
    }  
};

// Show user profile data
export const authProfile = async (token:string): Promise<AuthResponse> => {
    try {
        const response = await axios.get(`${ apiUri }/auth/profile`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${ token }`
            }
        });
        return response.data;
    } catch (error) {
        throw axiosHandleErrors(error);
    }
};

// User logout
export const authLogout = async (token:string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${ apiUri }/auth/logout`, null, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${ token }`
            }
        });
        return response.data;
    } catch (error) {
        throw axiosHandleErrors(error);
    }  
};