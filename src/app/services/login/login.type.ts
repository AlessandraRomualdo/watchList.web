export interface role {
    "role": "admin" | "user" | "editor";
}

export interface login {
    "id": string;
    "role": role;
    "token_aceess": string;
}