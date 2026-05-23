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

export interface LoginError {
    username: string;
    password: string;
}

export interface LoginData {
    username: string;
    password: string;
}