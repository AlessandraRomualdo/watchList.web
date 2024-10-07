import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RegisterService } from "../../services/register/register.service";
import { SHA256 } from "crypto-js";

@Component({
    selector: 'app-register',
    standalone: true,
    template: `
        <div>
            <form [formGroup]="form" class="w-[1132px] m-auto">
                <div class="flex flex-col gap-2 p-2">
                    <div class="flex flex-col p-2 gap-2">
                        <label for="">Nome</label>
                        <input type="text" class="p-2 border border-background rounded-md" formControlName="name" placeholder="Nome" />
                    </div>
                    <div class="flex flex-col p-2 gap-2">
                        <label for="">Email</label>
                        <input type="text" class="p-2 border border-background rounded-md" formControlName="email" placeholder="Email" />
                    </div>
                    <div class="flex flex-col p-2 gap-2">
                        <label for="">Data de nacimento</label>
                        <input type="text" class="p-2 border border-background rounded-md" formControlName="birthDate" placeholder="Aniversario" />
                    </div>
                    <div class="flex flex-col p-2 gap-2">
                        <label for="">Senha</label>
                        <input type="password" class="p-2 border border-background rounded-md" formControlName="pass" placeholder="Senha" />
                    </div>    

                    <button (click)="onSubmit()" type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    `,
    imports: [ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {

        public form!: FormGroup;
    
        constructor(
            public registerService: RegisterService,
        ) { }
    
        ngOnInit() {
            this.buildForm();
        }

        buildForm() {
            this.form = new FormGroup({
                name: new FormControl('', Validators.required),
                email: new FormControl('', Validators.required),
                pass: new FormControl('', Validators.required),
                birthDate: new FormControl('', Validators.required),
            });
        }
    
        onSubmit() {
            const { name, email, pass, birthDate } = this.form.value;
            const password = SHA256(pass).toString();
            this.registerService.register({ name, email, password, birthDate}).subscribe((data) => {
                console.log(data);
            });
            
        }
}