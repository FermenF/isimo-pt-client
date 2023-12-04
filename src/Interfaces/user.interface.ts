export interface User {
    id:         number;
    name:       string;
    email:      string;
    photo:     string | null;
    created_at: Date;
    updated_at: Date;
};