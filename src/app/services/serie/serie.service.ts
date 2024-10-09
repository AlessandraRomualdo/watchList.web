import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient, HttpParams } from "@angular/common/http";
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

    getSeries(filters?: { title?: string; gender?: string; orderBy?: string }): Observable<Serie[]> {
        
        // se não tiver filtro, seta o orderBy como asc
        filters = { orderBy: 'asc', ...filters };

        // com GET deve se usar o HttpParams para passar os parametros
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
        
        return this.http.get<{ data: Serie[] }>(`${this.API}/serie`, { params }).pipe(
            map((response: { data: Serie[] }) => response.data)
        );
    }

    getSerieById(id: string): Observable<Serie> {
        return this.http.get<{ data: Serie }>(`${this.API}/serie/${id}`).pipe(
            map((response: { data: Serie }) => response.data)
        );
    }

    editSerie(id: string, serie: any): Observable<Serie> {
        return this.http.patch<{ data: Serie }>(`${this.API}/serie/${id}`, serie).pipe(
            map((response: { data: Serie }) => response.data)
        );
    }

    deleteSerie(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API}/serie/${id}`);
    }

    createMovie(serie: any): Observable<Serie> {
        return this.http.post<{ data: Serie }>(`${this.API}/serie`, serie).pipe(
            map((response: { data: Serie }) => response.data)
        );
    }
}