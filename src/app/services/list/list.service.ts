import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { List } from "./list.types";


@Injectable({
    providedIn: 'root'
})
export class ListService {

    private readonly API = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) { }

    getLists(): Observable<List[]> {
        return this.http.get<{ data: List[] }>(`${this.API}/list`).pipe( map((response: { data: List[] }) => response.data) );
    }
}