import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../../services/movie/movie.types';


@Component({
  selector: 'app-movie-list-item',
  standalone: true,
  template: `
        <div class="max-w-[1032px] w-full flex text-white justify-between items-center p-4 border-b bg-background-secondary shadow-lg hover:opacity-70 hover:bg-primary hover:text-black cursor-pointer">
            <div class="flex flex-col gap-2 items-start">
                <h3 class="text-lg font-bold ">{{ movie.title }}</h3>
                <p class="text-sm ">Genero: {{ movie.gender.gender }}</p>
            </div>
            <div class="flex space-x-2">
                <button class="px-4 py-2" (click)="onEdit()"><img src="/assets/icons/edit.svg" alt="icone de editar"></button>
                <button class="px-4 py-2" (click)="onDelete()"><img src="/assets/icons/trash-2.svg" alt="icone de excluir"></button>
            </div>
    </div>

  `,
  imports: []
})
export class MovieListItemComponent {

  @Input() movie!: Movie;
  @Output() editMovie = new EventEmitter<Movie>();
  @Output() deleteMovie = new EventEmitter<Movie>();

  onEdit(): void {
    this.editMovie.emit(this.movie);
  }

  onDelete(): void {
    this.deleteMovie.emit(this.movie);
  }
}
