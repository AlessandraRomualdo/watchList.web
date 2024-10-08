import { Component, OnInit } from "@angular/core";
import { HeaderAdminComponent } from "./components/header-admin/header-admin.component";
import { CardDashbordComponent } from "./components/card-dashbord/card-dashbord.component";
import { MovieService } from "../../services/movie/movie.service";
import { SerieService } from "../../services/serie/serie.service";
import { Movie } from "../../services/movie/movie.types";
import { Serie } from "../../services/serie/serie.type";
import { UserService } from "../../services/user/user.service";
import { User } from "../../services/user/user.type";
import { ListService } from "../../services/list/list.service";
import { Router, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html',
    standalone: true,
    imports: [HeaderAdminComponent, CardDashbordComponent, RouterOutlet]
})
export class AdministrationComponent implements OnInit{

    public movies: Movie[] = [];
    public series: Serie[] = [];
    public users: User[] = [];
    public lists: any[] = [];
    
    constructor(
        private movieService: MovieService,
        private serieService: SerieService,
        private userService: UserService,
        private listService: ListService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.movieService.getMovies().subscribe((data: any) => {
            this.movies = data;
        });
        this.serieService.getSeries().subscribe((data: Serie[]) => {
            this.series = data;
        });
        this.userService.getUsers().subscribe((data: User[]) => {
            this.users = data;
        });
        this.listService.getLists().subscribe((data: any) => {
            this.lists = data;
        });
    }

    onManageMovies(): void {
        this.router.navigate(['administration/movie-settings']);
    }
}