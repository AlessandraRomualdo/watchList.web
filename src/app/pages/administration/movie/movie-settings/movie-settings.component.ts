import { Component, inject, OnInit } from "@angular/core";
import { MovieService } from "../../../../services/movie/movie.service";
import { Movie } from "../../../../services/movie/movie.types";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { GenderService } from "../../../../services/gender/gender.service";
import { Gender } from "../../../../services/gender/gender.types";
import { debounceTime } from "rxjs";
import { Router } from "@angular/router";
import { MovieListItemComponent } from "../../components/movie-item-list/movie-item-list.component";


@Component({
    selector: 'app-movie-settings',
    standalone: true,
    template: `
        <section class="bg-background w-full flex flex-col  min-h-screen">
        <h1 class="mt-4 text-white text-3xl font-bold border-b-2 border-primary text-center">Gerenciamento de Filmes</h1>
            <form [formGroup]="form" class="mt-8 w-full flex flex-col md:flex-row items-center justify-between p-2 gap-4">
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
                <div class="w-full flex items-center justify-center gap-4">
                    <input 
                        type="radio" 
                        name="order" 
                        id="asc" 
                        value="asc" 
                        formControlName="order"
                        class="hidden"
                    />
                    <label 
                        class="mt-8 text-white font-bold text-sm cursor-pointer p-2 bg-primary border border-primary rounded-lg overflow-hidden hover:bg-primary-hover"
                         [ngClass]="{ 'bg-primary-dark text-white': form.get('order')?.value === 'asc' }"
                        for="asc"
                    >A - Z</label>

                    <input 
                        type="radio" 
                        name="order" 
                        id="desc" 
                        value="desc" 
                        formControlName="order"
                        class="hidden"
                    />
                    <label 
                        class="mt-8 text-white font-bold text-sm cursor-pointer p-2 bg-primary border border-primary rounded-lg overflow-hidden hover:bg-primary-hover"
                        [ngClass]="{ 'bg-primary-dark text-white': form.get('order')?.value === 'desc' }"
                        for="desc"
                    >Z - A</label>
                    </div>

                <div class="w-full flex justify-center">
                    <button
                        type="button"
                        (click)="newMovie()"
                        class="mt-9 text-white font-bold bg-primary px-4 py-2 border border-primary rounded-full hover:bg-primary-hover"
                    > + Novo Filme</button>
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
        private router: Router,
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
            orderBy: this.form.get('order')?.value || 'asc',
        };
        console.log('filtros:', filterValues);
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
            order: new FormControl('asc'),
        });    
    }

    // metodo para ir para a tela q cria um novo filme
    newMovie(): void {
        this.router.navigate(['/administration/new-movie']);
    }

    // metodo para editar um filme
    onEditMovie(movie: Movie): void {
        console.log('Editar filme:', movie);
        this.router.navigate(['/administration/movie-edit', movie.id]);
    }

    // metodo para excluir um filme
    onDeleteMovie(movie: Movie): void {
        console.log('Excluir filme:', movie);
        this.movieService.deleteMovie(movie.id).subscribe(() => {
        this.getMovies();
        });
    }
}