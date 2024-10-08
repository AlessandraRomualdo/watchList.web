import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { map, Observable } from "rxjs";
import { Gender } from "./gender.types";


@Injectable({
    providedIn: 'root'
})
export class GenderService {

    private readonly API = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) { }

    getGenders(): Observable<Gender[]> {
        return this.http.get<{ data: Gender[] }>(`${this.API}/gender`).pipe( map((response: { data: Gender[] }) => response.data) );
    }
}