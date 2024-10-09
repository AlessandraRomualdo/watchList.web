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
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";


@Component({
    selector: 'app-movie-settings',
    standalone: true,
    template: `
        <section class="bg-background w-full flex flex-col  min-h-screen">
        <h1 class="mt-4 text-white text-3xl font-bold border-b-2 border-primary text-center">Gerenciamento de Filmes</h1>
            <app-search-bar 
                [IsAdmin]="true"
                [form]="form"
                titleBtn="+ Novo Filme"
                (btnClick)="newMovie()"
            ></app-search-bar>
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
    imports: [MovieListItemComponent, CommonModule, ReactiveFormsModule, SearchBarComponent],
})
export class MovieSettingsComponent implements OnInit{

    public movies: Movie[] = [];
    
    public noMoviesFound: boolean = false;

    public form!: FormGroup;

    
    constructor(
        private movieService: MovieService,
        
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.buidForm();
        this.getMovies();

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