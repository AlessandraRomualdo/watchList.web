import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormMovieComponent } from "../../components/form-movie/form-movie.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MovieService } from "../../../../services/movie/movie.service";
import { Movie } from "../../../../services/movie/movie.types";
import { SerieService } from "../../../../services/serie/serie.service";
import { Serie } from "../../../../services/serie/serie.type";


@Component({
    selector: 'app-serie-edit',
    standalone: true,
    template: `
        <div class="max-w-[1032px] h-auto bg-background shadow-xl">
            <div class="flex flex-col w-full">
                <div class="flex w-full items-center justify-between p-2 py-4 text-white font-bold">
                    <h2 class="ml-4 text-2xl">Edição de dados da Serie</h2>
                </div>
                <div class="bg-primary h-[1px] w-full"></div>
            </div>
            <div class="flex w-full h-auto flex-col md:flex-row">
                <app-form-movie 
                    class="w-full"
                    [IsSerie]="true"
                    [form]="serieForm"
                ></app-form-movie>
            </div>
            <div class="w-full flex flex-col">
                <div class="bg-primary h-[1px] w-full"></div>
                <div class="w-full mb-4 flex items-center justify-end self-end gap-4">
                    <button 
                    type="button"
                    routerLink="/administration/serie-settings"
                    class="mt-9 text-white font-bold bg-primary px-4 py-2 border border-primary rounded-full hover:bg-primary-hover"
                    >Voltar</button>
                    <button
                        [disabled]="serieForm.invalid || serieForm.pristine"
                        type="button"
                        (click)="editSerie()"
                        class="mt-9 text-white font-bold bg-primary px-4 py-2 border border-primary rounded-full hover:bg-primary-hover disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:border-gray-500"
                    >Salvar</button>
                </div>
            </div>
        </div>
    `,
    imports: [ReactiveFormsModule, CommonModule, FormMovieComponent, RouterLink]
})
export class SerieEditComponent implements OnInit{

    public serieForm!: FormGroup;
    public serie!: Serie;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private serieService: SerieService,
    ) { }

    ngOnInit(): void {
        this.buildForm();

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.serieService.getSerieById(id).subscribe(serie => {
                this.serie = serie;
                this.loadSerieData();
                });
            }
        });

    }

    buildForm(): void {
        this.serieForm = new FormGroup({
          title: new FormControl('', Validators.required),
          gender: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          poster: new FormControl('', Validators.required),
          seasons: new FormControl('', Validators.required),
        });
    }

    loadSerieData(): void {
        this.serieForm.patchValue({
            title: this.serie.title,
            gender: this.serie.gender.id,
            description: this.serie.description,
            poster: this.serie.poster,
            seasons: this.serie.seasons
        });
    }

    editSerie(): void {
        if (this.serieForm.invalid) {
            return;
        }

        const serie = this.serieForm.getRawValue();
        const id = this.serie.id;
        const serieEdit = {
            title: serie.title,
            poster: serie.poster,
            description: serie.description,
            genderId: this.serieForm.getRawValue().gender,
            seasons: serie.seasons
        }
        this.serieService.editSerie(id, serieEdit).subscribe(() => {
            this.router.navigate(['/administration/serie-settings']);
        });

        this.serieForm.markAsPristine();
    }
}