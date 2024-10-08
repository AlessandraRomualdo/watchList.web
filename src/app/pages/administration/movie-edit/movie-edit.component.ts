import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormMovieComponent } from "../components/form-movie/form-movie.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MovieService } from "../../../services/movie/movie.service";
import { Movie } from "../../../services/movie/movie.types";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'app-movie-edit',
    standalone: true,
    template: `
        <div class="max-w-[1032px] h-auto bg-background shadow-xl">
            <div class="flex flex-col w-full">
                <div class="flex w-full items-center justify-between p-2 py-4 text-white font-bold">
                    <h2 class="ml-4 text-2xl">Edição de dados do Filme</h2>
                </div>
                <div class="bg-primary h-[1px] w-full"></div>
            </div>
            <div class="flex w-full h-auto flex-col md:flex-row">
                <app-form-movie class="w-full" [form]="movieForm"></app-form-movie>
            </div>
            <div class="w-full flex flex-col">
                <div class="bg-primary h-[1px] w-full"></div>
                <div class="w-full mb-4 flex items-center justify-end self-end gap-4">
                    <button 
                    type="button"
                    routerLink="/administration/movie-settings"
                    class="mt-9 text-white font-bold bg-primary px-4 py-2 border border-primary rounded-full hover:bg-primary-hover"
                    >Voltar</button>
                    <button
                        [disabled]="movieForm.invalid || movieForm.pristine"
                        type="button"
                        (click)="editMovie()"
                        class="mt-9 text-white font-bold bg-primary px-4 py-2 border border-primary rounded-full hover:bg-primary-hover disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:border-gray-500"
                    >Salvar</button>
                </div>
            </div>
        </div>
    `,
    imports: [ReactiveFormsModule, CommonModule, FormMovieComponent, RouterLink]
})
export class MovieEditComponent implements OnInit{

    public movieForm!: FormGroup;
    public movie!: Movie;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private movieService: MovieService,
    ) { }

    ngOnInit(): void {
        this.buildForm();

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.movieService.getMovieById(id).subscribe(movie => {
                this.movie = movie;
                this.loadMovieData();
                });
            }
        });

    }

    buildForm(): void {
        this.movieForm = new FormGroup({
          title: new FormControl('', Validators.required),
          gender: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          poster: new FormControl('', Validators.required),
        });
    }

    loadMovieData(): void {
        this.movieForm.patchValue({
            title: this.movie.title,
            gender: this.movie.gender.id,
            description: this.movie.description,
            poster: this.movie.poster
        });
    }

    editMovie(): void {
        if (this.movieForm.invalid) {
            return;
        }

        const movie = this.movieForm.getRawValue();
        const id = this.movie.id;
        const modieEdit = {
            title: movie.title,
            poster: movie.poster,
            description: movie.description,
            genderId: this.movieForm.getRawValue().gender
        }
        this.movieService.editMovie(id, modieEdit).subscribe(() => {
            this.router.navigate(['/administration/movie-settings']);
        });

        this.movieForm.markAsPristine();
    }
}