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

    getMovies(filters?: { title?: string; gender?: string; orderBy?: string }): Observable<Movie[]> {
        // se não tiver filtro, seta o orderBy como asc
        filters = { orderBy: 'asc', ...filters };

        // com GET deve ser usar o HttpParams para passar os parametros
        let params = new HttpParams();
        if (filters.orderBy) {
            params = params.set('orderBy', filters.orderBy);
        }

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

    getMovieById(id: string): Observable<Movie> {
        return this.http.get<{ data: Movie }>(`${this.API}/movie/${id}`).pipe(
            map((response: { data: Movie }) => response.data)
        );
    }

    editMovie(id: string, movie: any): Observable<Movie> {
        return this.http.patch<{ data: Movie }>(`${this.API}/movie/${id}`, movie).pipe(
            map((response: { data: Movie }) => response.data)
        );
    }

    deleteMovie(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API}/movie/${id}`);
    }

    createMovie(movie: any): Observable<Movie> {
        return this.http.post<{ data: Movie }>(`${this.API}/movie`, movie).pipe(
            map((response: { data: Movie }) => response.data)
        );
    }
}    