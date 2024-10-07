import { Component, Input } from "@angular/core";
import { Movie } from "../../services/movie/movie.types";
import { Serie } from "../../services/serie/serie.type";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'app-card-movie',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="flex flex-col justify-center items-center w-[250px] h-[450px] bg-primary rounded-md shadow-lg overflow-hidden text-black hover:text-white hover:bg-background hover:bg-opacity-30 cursor-pointer">
        <img class="w-full h-[370px] object-cover" [src]="movie.poster" alt="{{ movie.title }}">
        
        <div class="w-full h-[80px] flex flex-col justify-between items-center p-4">
            <h2 class="text-sm font-bold">{{ movie.title }}</h2>
            <p class="text-sm">{{ movie.gender.gender }}  <span *ngIf="isSerie(movie)"> | {{ movie.seasons }} temporadas</span></p>
        </div>
    `,
})
export class CardMovieComponent {

    @Input() movie!: Movie | Serie;

    // Função para verificar se o input é uma série
  isSerie(movie: Movie | Serie): movie is Serie {
    return (movie as Serie).seasons !== undefined;
  }
}