import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { User } from "./user.type";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    private readonly API = environment.apiUrl;
    
    constructor(
        private http: HttpClient,
    ) { }

    getUsers(): Observable<User[]> {
        return this.http.get<{ data: User[] }>(`${this.API}/user`).pipe(
            map((response: { data: User[] }) => response.data)
        );
    }
}