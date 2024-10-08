import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
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

    getMovies(filters?: { title?: string; gender?: string }): Observable<Movie[]> {
        // com GET deve ser usar o HttpParams para passar os parametros
        let params = new HttpParams();

        // adiciona o filtro como param se tiver
        if (filters?.title) {
            params = params.set('title', filters.title);
        }
        if (filters?.gender) {
            params = params.set('gender', filters.gender);
        }

        return this.http.get<{ data: Movie[] }>(`${this.API}/movie`, { params }).pipe(
            map((response: { data: Movie[] }) => response.data)
        );
    }
}    