import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './services/movie/movie.service';
import { CardMovieComponent } from './shared/card-movie/card-movie.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardMovieComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  public movies: any;
  
  constructor(
    public movieService: MovieService,
  ) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((data: any) => {
      this.movies = data;
      console.log(this.movies);
    });
  }
}
