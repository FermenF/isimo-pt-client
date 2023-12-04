import { User } from "./user.interface";

export interface PostResponse {
    data:    Data;
    message: string;
    error:   string;
}

export interface Data {
    current_page:   number;
    data:           Post[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Post {
    id:          number;
    user_id:     number;
    content:     string;
    url:         string;
    user:        User;
    post_images: PostImage[];
    created_at:  Date;
    updated_at:  Date;
    deleted_at:  null;
}

export interface PostImage {
    id:      number;
    post_id: number;
    path:    string;
    url:     string;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}
