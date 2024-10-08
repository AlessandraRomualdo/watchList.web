import { Component, OnInit } from "@angular/core";
import { FormMovieComponent } from "../../components/form-movie/form-movie.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MovieService } from "../../../../services/movie/movie.service";

@Component({
    selector: 'app-new-movie',
    standalone: true,
    template: `
        <div class="max-w-[1032px] h-auto bg-background shadow-xl">
            <div class="flex flex-col w-full">
                <div class="flex w-full items-center justify-between p-2 py-4 text-white font-bold">
                    <h2 class="ml-4 text-2xl">Novo Filme</h2>
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
                        (click)="createMovie()"
                        class="mt-9 text-white font-bold bg-primary px-4 py-2 border border-primary rounded-full hover:bg-primary-hover disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:border-gray-500"
                    >Salvar</button>
                </div>
            </div>
        </div>
    `,
    imports: [FormMovieComponent, RouterLink]
})
export class NewMovieComponent implements OnInit{ 

    public movieForm!: FormGroup;

    constructor(
        private movieService: MovieService,
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.movieForm = new FormGroup({
          title: new FormControl('', Validators.required),
          gender: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          poster: new FormControl('', Validators.required),
        });
    }

    createMovie():void {
        const movie = this.movieForm.value;
        const newMovie = {
            title: movie.title,
            description: movie.description,
            poster: movie.poster,
            genderId: movie.gender
        }
        this.movieService.createMovie(newMovie).subscribe(() => {
            this.movieForm.reset();
        });
        console.log(newMovie);
    }
}