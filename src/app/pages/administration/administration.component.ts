import { Component, OnInit } from "@angular/core";
import { HeaderAdminComponent } from "./components/header-admin/header-admin.component";
import { CardDashbordComponent } from "./components/card-dashbord/card-dashbord.component";
import { MovieService } from "../../services/movie/movie.service";
import { SerieService } from "../../services/serie/serie.service";
import { Movie } from "../../services/movie/movie.types";
import { Serie } from "../../services/serie/serie.type";

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html',
    standalone: true,
    imports: [HeaderAdminComponent, CardDashbordComponent]
})
export class AdministrationComponent implements OnInit{

    public movies: Movie[] = [];
    public series: Serie[] = [];
    
    constructor(
        private movieService: MovieService,
        private serieService: SerieService,
    ) {}

    ngOnInit() {
        this.movieService.getMovies().subscribe((data: any) => {
            this.movies = data;
        });

        this.serieService.getSeries().subscribe((data: Serie[]) => {
            this.series = data;
        });
    }
}