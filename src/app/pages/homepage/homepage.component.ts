import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CardMovieComponent } from "../../shared/card-movie/card-movie.component";
import { MovieService } from "../../services/movie/movie.service";
import { Movie } from "../../services/movie/movie.types";
import { SerieService } from "../../services/serie/serie.service";
import { Serie } from "../../services/serie/serie.type";
import { HeaderComponent } from "../../shared/hearder/header.component";

@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    imports: [CommonModule, CardMovieComponent, HeaderComponent],
})
export class HomepageComponent implements OnInit{

    public movies: Movie[] = [];
    public series: Serie[] = [];
    public media!: (Movie | Serie)[];

    constructor(
        public movieService: MovieService,
        public serieService: SerieService,
      ) {}
    
      ngOnInit() {
        this.movieService.getMovies().subscribe((data: any) => {
          this.movies = data;
          this.media = this.movies.concat(this.series);
          console.log(this.movies);
        });
    
        this.serieService.getSeries().subscribe((data: Serie[]) => {
          this.series = data;
          this.media = this.movies.concat(this.series);
          console.log(this.series);
        });
      }
}