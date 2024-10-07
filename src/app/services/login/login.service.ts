import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { login } from "./login.type";


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private readonly API = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) { }

    login(email: string, password: string): Observable<login> {
        return this.http.post<login>(`${this.API}/authentication/login`, { email, password });
    }
}