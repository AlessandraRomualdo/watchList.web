import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { SHA256 } from "crypto-js";
import { first, firstValueFrom, Observable } from "rxjs";
import { login } from "./login.type";


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private readonly API = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) { }

    async login(email: string, password: string): Promise<Observable<login>> {
        const hash = SHA256(password).toString();
        const res = this.http.post<login>(`${this.API}/authentication/login`, { email, password: hash });
        const { token_aceess } = await firstValueFrom(res);
        this.setLoginData(token_aceess);
        return res
    }

    private setLoginData(token: string) {
        if (!token) throw new Error('Token is required');
        localStorage.setItem('token', token);

    }
}