import axios from "axios";
import { apiUri } from "@config/api";
import { axiosHandleErrors } from "@utils/axiosApiErrors";
import { UserListResponse, UserResponse } from "@interfaces/user.interface";

// Show user lists
export const userGetAll = async (email: string, token: string): Promise<UserListResponse> => {
    try {
        const response = await axios.get(`${apiUri}/users`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                'email': email
            }
        });
        return response.data;
    } catch (error) {
        throw axiosHandleErrors(error);
    }
};

export const userGetAllChangePage = async (url: string, token: string): Promise<UserListResponse> => {
    try {
        const response = await axios.get(`${url}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw axiosHandleErrors(error);
    }
};

export const userShow = async (id: string, token: string): Promise<UserResponse> => {
    try {
        const response = await axios.get(`${apiUri}/users/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw axiosHandleErrors(error);
    }
}