import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../../services/movie/movie.service";
import { Movie } from "../../../services/movie/movie.types";
import { MovieListItemComponent } from "./components/movie-item-list/movie-item-list.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";


@Component({
    selector: 'app-movie-settings',
    standalone: true,
    template: `
        <section class="bg-background w-full flex flex-col  min-h-screen">

            <div class="w-full flex items-center justify-between p-2 gap-4">
                <div class="w-full flex flex-col items-start justify-start">
                    <label class="py-2 text-white" for="search">Busca</label>
                    <input
                        class="h-10 w-full border text-white border-gray-300 p-2 rounded-xl bg-background-secondary" 
                        id="search" 
                        type="text" 
                        placeholder="Busque o nome do filme">
                </div>
                <div class="w-full flex flex-col items-start justify-start">
                    <label class="py-2 text-white" for="genero">Genero</label>
                    <select
                        id="genero"
                        class="h-10 w-full border text-white border-gray-300 p-2 rounded-xl bg-background-secondary">
                        <option value="">Selecione um genero</option>
                        <option *ngFor="let movie of movies" value="{{movie.gender.gender}}">{{movie.gender.gender}}</option>
                    </select>
                </div>
                <div class="w-full">
                    <button class="mt-9 text-white font-bold bg-primary px-4 py-2 border border-primary rounded-full hover:bg-primary-hover"> + Novo Filme</button>
                </div>
            </div>
            <div class="mt-8">
                <app-movie-list-item
                    *ngFor="let movie of movies"
                    [movie]="movie"
                    (editMovie)="onEditMovie($event)"
                    (deleteMovie)="onDeleteMovie($event)"
                ></app-movie-list-item>
            </div>
        </section>
    `,
    imports: [MovieListItemComponent, CommonModule, ReactiveFormsModule]
})
export class MovieSettingsComponent implements OnInit{

    public movies: Movie[] = [];
    
    constructor(
        private movieService: MovieService,
    ) {}

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.movieService.getMovies().subscribe((data: any) => {
            this.movies = data;
        });
    }

    // Método para editar um filme
  onEditMovie(movie: Movie): void {
    console.log('Editar filme:', movie);
    // lógica para abrir o modal ou redirecionar para a tela de edição
  }

  // Método para excluir um filme
  onDeleteMovie(movie: Movie): void {
    console.log('Excluir filme:', movie);
    // lógica para excluir o filme
  }
}