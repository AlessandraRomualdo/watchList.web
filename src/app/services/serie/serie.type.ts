import { Movie } from "../movie/movie.types";

export interface Serie extends Movie{
    seasons: number;
}