import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Movie } from "../../../../services/movie/movie.types";
import { GenderService } from "../../../../services/gender/gender.service";
import { Gender } from "../../../../services/gender/gender.types";

@Component({
    selector: 'app-form-movie',
    standalone: true,
    template: `
        <div [formGroup]="form" class="w-full px-2 py-4 flex gap-2">
            <div class="w-full">
                <!-- title / gender -->
                <div class="flex flex-col md:flex-row w-full gap-2">
                    <div class="flex flex-col w-full p-2">
                        <label class="text-white" for="title">Titulo</label>
                        <input 
                            class="h-10 w-full outline-none border text-white border-gray-300 p-2 rounded-xl bg-background-secondary" 
                            id="title" 
                            type="text" 
                            formControlName="title" 
                            placeholder="Titulo do filme">
                    </div>
                    <div class="flex flex-col w-full p-2">
                        <label class="text-white" for="gender">Genero</label>
                        <select 
                            class="h-10 w-full outline-none border text-white border-gray-300 p-2 rounded-xl bg-background-secondary" 
                            formControlName="gender">
                            <option value="">Selecione um genero</option>
                            <option *ngFor="let gender of genders" [value]="gender.id">{{ gender.gender }}</option>
                        </select>   
                    </div>
                </div>
                <!-- description / poster -->
                <div class="flex flex-col md:flex-row w-full gap-2">
                    <div class="flex flex-col w-full p-2">
                        <label class="text-white" for="description">Descrição</label>
                        <textarea 
                            class="h-44 w-full outline-none border text-white border-gray-300 p-2 rounded-xl bg-background-secondary" 
                            id="description" 
                            formControlName="description" 
                            placeholder="Descrição do filme"></textarea>
                    </div>
                    <div class="flex flex-col w-full p-2">
                        <label class="text-white" for="poster">Poster</label>
                        <input 
                            class="h-10 w-full outline-none border text-white border-gray-300 p-2 rounded-xl bg-background-secondary" 
                            id="poster" 
                            type="text" 
                            formControlName="poster" 
                            placeholder="URL do poster">
                         
                        </div>
                </div>

            </div>
                <img class="mt-4 h-auto w-[250px] object-cover overflow-hidden rounded-lg" [src]="form.get('poster')?.value" alt="poster do filme">  
        </div>  
    `,
    imports: [CommonModule, ReactiveFormsModule]
})
export class FormMovieComponent implements OnInit {

    @Input() form!: FormGroup;
    public genders: Gender[] = [];

    constructor(
        private genderService: GenderService,
    ) { }

    ngOnInit(): void {
        this.getGenders();
    }

    private getGenders(): void {
        this.genderService.getGenders().subscribe((response) => {
            this.genders = response;
        });    
    }
}
