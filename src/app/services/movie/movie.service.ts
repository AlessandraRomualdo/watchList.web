import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environments";
import { map, Observable } from "rxjs";
import { Movie } from "./movie.types";
@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly API = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) { }

    getMovies(): Observable<Movie[]> {
        return this.http.get<{ data: Movie[] }>(`${this.API}/movie`).pipe(
            map((response: { data: Movie[] }) => response.data)
        );
    }
}    