import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { MovieListItemComponent } from "../../components/movie-item-list/movie-item-list.component";
import { SerieService } from "../../../../services/serie/serie.service";
import { Router } from "@angular/router";
import { Serie } from "../../../../services/serie/serie.type";
import { debounceTime } from "rxjs";

@Component({
    selector: 'app-serie-settings',
    standalone: true,
    template: `
        <section class="bg-background w-full flex flex-col  min-h-screen">
        <h1 class="mt-4 text-white text-3xl font-bold border-b-2 border-primary text-center">Gerenciamento de Series</h1>
            <app-search-bar 
                [IsAdmin]="true"
                [form]="form"
                titleBtn="+ Nova Serie"
                (btnClick)="newSerie()"
            ></app-search-bar>
            <div class="mt-8">
                <div *ngIf="!noSeriesFound">
                    <app-movie-list-item
                        *ngFor="let serie of series"
                        [movie]="serie"
                        (editMovie)="onEditSerie($event)"
                        (deleteMovie)="onDeleteSerie($event)"
                    ></app-movie-list-item>
                </div>
                <div *ngIf="noSeriesFound">
                    <p class="text-white font-bold text-center text-xl">Nenhuma Serie encontrada.</p>
                </div>
            </div>
        </section>
    `,
    imports: [CommonModule, ReactiveFormsModule, SearchBarComponent, MovieListItemComponent],
})
export class SerieSettingsComponent implements OnInit{

    public series: Serie[] = [];
    public form!: FormGroup;
    public noSeriesFound: boolean = false;
    
    constructor(
        private seriesService: SerieService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.buidForm();
        this.getSeries();

        // usando o debounceTime para diminuir a quantidade de requisições ao servidor
        this.form.valueChanges.pipe(
            debounceTime(1500)
        ).subscribe(() => {
            this.getSeries();
        });
    }

    buidForm(): void {
        this.form = new FormGroup({
            title: new FormControl(''),
            gender: new FormControl(''),
            order: new FormControl('asc'),
        });    
    }

    getSeries(): void {
        const filterValues = {
            title: this.form.get('title')?.value || '',
            gender: this.form.get('gender')?.value || '',
            orderBy: this.form.get('order')?.value || 'asc',
        }
        this.seriesService.getSeries(filterValues).subscribe((series) => {
            if (series.length === 0) {
                this.noSeriesFound = true;
            } else {
                this.noSeriesFound = false;
                this.series = series;
            }
        }, error => {
            console.error("Erro ao buscar series", error);
            this.noSeriesFound = true;
        });
    }

    newSerie(): void {
        this.router.navigate(['/administration/new-serie']);
    }

    onEditSerie(serie: Serie): void {
        this.router.navigate(['/administration/serie-edit' , serie.id]);

    }

    onDeleteSerie(serie: Serie): void {
        this.seriesService.deleteSerie(serie.id).subscribe(() => {
            this.getSeries();
        });
    }
}