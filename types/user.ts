export interface SignUpError {
    username: string;
    email: string;
    password: string;
    rePass: string;
}

export interface SignUpData {
    username: string;
    email: string;
    password: string;
    roles: string;
}