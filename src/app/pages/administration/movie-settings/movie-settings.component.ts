import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../../services/movie/movie.service";
import { Movie } from "../../../services/movie/movie.types";
import { MovieListItemComponent } from "./components/movie-item-list/movie-item-list.component";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { GenderService } from "../../../services/gender/gender.service";
import { Gender } from "../../../services/gender/gender.types";
import { debounceTime } from "rxjs";


@Component({
    selector: 'app-movie-settings',
    standalone: true,
    template: `
        <section class="bg-background w-full flex flex-col  min-h-screen">

            <form [formGroup]="form" class="w-full flex flex-col md:flex-row items-center justify-between p-2 gap-4">
                <div class="w-full flex flex-col items-start justify-start">
                    <label class="py-2 text-white" for="search">Busca</label>
                    <input
                        class="h-10 w-full outline-none border text-white border-gray-300 p-2 rounded-xl bg-background-secondary" 
                        id="search" 
                        type="text"
                        formControlName="title"
                        placeholder="Busque o nome do filme">
                </div>
                <div class="w-full flex flex-col items-start justify-start">
                    <label class="py-2 text-white" for="genero">Genero</label>
                    <select
                        id="genero"
                        formControlName="gender"
                        class="h-10 w-full border text-white border-gray-300 p-2 rounded-xl bg-background-secondary">
                        <option value="">Selecione um genero</option>
                        <option *ngFor="let gender of genders" value={{gender.gender}}>{{ gender.gender }}</option>
                    </select>
                </div>
                <div class="w-full flex justify-center">
                    <button type="button" class="mt-9 text-white font-bold bg-primary px-4 py-2 border border-primary rounded-full hover:bg-primary-hover"> + Novo Filme</button>
                </div>
            </form>
            <div class="mt-8">
                <div *ngIf="!noMoviesFound">
                    <app-movie-list-item
                        *ngFor="let movie of movies"
                        [movie]="movie"
                        (editMovie)="onEditMovie($event)"
                        (deleteMovie)="onDeleteMovie($event)"
                    ></app-movie-list-item>
                </div>
                <div *ngIf="noMoviesFound">
                    <p class="text-white font-bold text-center text-xl">Nenhum filme encontrado.</p>
                </div>
            </div>
        </section>
    `,
    imports: [MovieListItemComponent, CommonModule, ReactiveFormsModule]
})
export class MovieSettingsComponent implements OnInit{

    public movies: Movie[] = [];
    public genders: Gender[] = [];
    public noMoviesFound: boolean = false;

    public form!: FormGroup;
    
    constructor(
        private movieService: MovieService,
        private genderService: GenderService,
    ) {}

    ngOnInit(): void {
        this.buidForm();
        this.getMovies();
        this.getGenders();

        // usando o debounceTime para diminuir a quantidade de requisições ao servidor
        this.form.valueChanges.pipe(
        debounceTime(1500)
      ).subscribe(() => {
        this.getMovies();
      });
    }

    getMovies(): void {
        const filterValues = {
            title: this.form.get('title')?.value || '',
            gender: this.form.get('gender')?.value || '',
        };

        // this.movieService.getMovies(filterValues).subscribe((data: any) => {
        //     this.movies = data;
        // });
        this.movieService.getMovies(filterValues).subscribe((data: any) => {
            if (data.length === 0) {
              this.noMoviesFound = true;
            } else {
              this.noMoviesFound = false;
              this.movies = data;
            }
          }, error => {
            console.error("Erro ao buscar filmes", error);
            this.noMoviesFound = true;
          });
    }

    getGenders(): void {
        this.genderService.getGenders().subscribe((data: any) => {
            this.genders = data;
        });    
    }

    buidForm(): void {
        this.form = new FormGroup({
            title: new FormControl(''),
            gender: new FormControl(''),
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