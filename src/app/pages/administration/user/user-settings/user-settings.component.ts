import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../../services/user/user.service";
import { User } from "../../../../services/user/user.type";
import { CommonModule } from "@angular/common";
import { UserListItemComponent } from "../../components/user-item-list/user-tem-list.component";

@Component({
    selector: 'app-user-settings',
    standalone: true,
    template: `
        <section class="bg-background w-full flex flex-col  min-h-screen">
            <h1 class="mt-4 text-white text-3xl font-bold border-b-2 border-primary text-center">Gerenciamento de Usuários</h1>
            <div class="mt-8">
                <app-user-item-list
                    *ngFor="let user of users"
                    [user]="user"
                ></app-user-item-list>
            </div>
        </section>
    `,
    imports: [CommonModule, UserListItemComponent]
})
export class UserSettingsComponent implements OnInit{ 

    public users: User[] = [];

    constructor(
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers().subscribe((users: User[]) => {
            this.users = users;
            console.log(this.users);
        });
    }
    
}