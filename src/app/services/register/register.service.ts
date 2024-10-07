import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environments";
import { UserRequest, UserResponse } from "./user.type";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private readonly API = environment.apiUrl;

    constructor(
        private http: HttpClient,
        
    ) { }

    register(data: UserRequest): Observable<UserResponse> {
        return this.http.post<UserResponse>(`${this.API}/user`, data);
    }
}