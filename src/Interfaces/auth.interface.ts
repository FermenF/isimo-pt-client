import { User } from "./user.interface";

export interface AuthResponse {
    data:    Token | User
    message: string,
    error:   string
};

export interface Token {
    token: string;
};

export interface AuthContextType {
    authToken:       string | null | "";
    performLogin:    (token: string) => void;
    performLogout:   () => void;
    user:            User | null;  
}