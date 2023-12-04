import { Post } from "./post.interface";

export interface UserResponse {
    data:    User[];        
    message: string;
    error:   string;
}

export interface User {
    id:         number;
    name:       string;
    email:      string;
    photo:      string | null;
    posts:      Post[];
    created_at: Date;
    updated_at: Date;
};