import { role } from "../login/login.type";

export interface UserResponse {
    "id": string;
    "name": string;
    "email": string;
    "birthDate": string;
    "role": {
        "id": string;
        "role": role;
    },
}

export interface UserRequest {
    "name": string;
    "email": string;
    "password": string;
    "birthDate": string;
}