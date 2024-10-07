import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Serie } from "./serie.type";

@Injectable({
    providedIn: 'root'
})
export class SerieService {

    private readonly API = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) { }

    getSeries(): Observable<Serie[]> {
        return this.http.get<{ data: Serie[] }>(`${this.API}/serie`).pipe(
            map((response: { data: Serie[] }) => response.data)
        );
    }
}