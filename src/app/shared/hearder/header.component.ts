import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-header',
    standalone: true,
    template: `
    <div class="fixed z-10 w-full h-[70px] bg-background flex items-center justify-between shadow-xl">
        <div class="max-w-[1032px] w-full m-auto flex items-center justify-between ">
            <h1 class="text-white font-bold w-[150px] self-start text-3xl "><span class="text-primary font-bold text-3xl">W</span>atchList</h1>
            <div class="flex items-center justify-around gap-2">
                <a class="text-white text-sm hover:text-primary" routerLink="/homepage">Home</a>
                <a class="text-white text-sm hover:text-primary" routerLink="/login">Login</a>
                <a class="text-white text-sm hover:text-primary" routerLink="/register">Register</a>
            </div>
        </div>
    </div>
    <div class="h-[70px] w-full"></div>
    `,
    imports: [RouterLink]
})
export class HeaderComponent {}