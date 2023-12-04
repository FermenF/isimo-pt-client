import axios, { AxiosError } from "axios";

interface ErrorMsg {
    message: string;
};

const defaultErrorMessage: string = "Error during request";

export function axiosHandleErrors(err: Error | AxiosError | unknown) {

    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
        throw new Error(defaultErrorMessage);
    }
    if(axios.isAxiosError(error)){
        if(error.response?.status == 401 && error.response?.data.message === "Unauthenticated." ){
            window.localStorage.removeItem('authToken');
            window.localStorage.removeItem('userAuthenticated');
        }
    }
    throw new Error(error.response?.data.message || defaultErrorMessage);
}

export function getMessageError(err: Error | AxiosError | unknown): string {
    const error = err as ErrorMsg;
    return error.message || defaultErrorMessage;
}