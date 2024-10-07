import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "../../services/login/login.service";

@Component({
    selector: 'app-login',
    standalone: true,
    template: `
        <div class="flex flex-col justify-center items-start gap-2 w-[1132px] m-auto">
            <h1>Login</h1>
            <form [formGroup]="form" class="flex flex-col justify-center items-center gap-2">
                <div class="flex flex-col gap-2 p-2">
                    <label for="">Email</label>
                    <input type="email"  class="p-2 border border-background rounded-md"  formControlName="email" placeholder="Email" />
                </div>
                <div class="flex flex-col gap-2 p-2">
                    <label for="">Senha</label>
                    <input type="password" class="p-2 border border-background rounded-md" formControlName="password" placeholder="Senha" />
                </div>
                <button (click)="onSubmit()" type="submit">Entrar</button>
            </form>
        </div>
    `,
    imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit{

    form!: FormGroup ;

    constructor(
        private loginService: LoginService,
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.form = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        this.loginService.login(this.form.value.email, this.form.value.password).subscribe((data) => {
            console.log(data);
        });
    }
}