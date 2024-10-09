import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Gender } from "../../../../services/gender/gender.types";
import { GenderService } from "../../../../services/gender/gender.service";


@Component({
    selector: 'app-search-bar',
    standalone: true,
    template: `
                    <form [formGroup]="form" class="mt-8 w-full flex flex-col md:flex-row items-center justify-between p-2 gap-4">
                <div class="w-full flex flex-col items-start justify-start">
                    <label class="py-2 text-white" for="search">Busca</label>
                    <input
                        class="h-10 w-full outline-none border text-white border-gray-300 p-2 rounded-xl bg-background-secondary" 
                        id="search" 
                        type="text"
                        formControlName="title"
                        placeholder="Busque por um nome">
                </div>
                <div class="w-full flex flex-col items-start justify-start">
                    <label class="py-2 text-white" for="genero">Genero</label>
                    <select
                        id="genero"
                        formControlName="gender"
                        class="h-10 w-full border text-white border-gray-300 p-2 rounded-xl bg-background-secondary">
                        <option value="">Selecione um genero</option>
                        <option *ngFor="let gender of genders" value={{gender.gender}}>{{ gender.gender }}</option>
                    </select>
                </div>
                <div class="w-full flex items-center justify-center gap-4">
                    <input 
                        type="radio" 
                        name="order" 
                        id="asc" 
                        value="asc" 
                        formControlName="order"
                        class="hidden"
                    />
                    <label 
                        class="mt-8 text-white font-bold text-sm cursor-pointer p-2 bg-primary border border-primary rounded-lg overflow-hidden hover:bg-primary-hover"
                         [ngClass]="{ 'bg-primary-dark text-white': form.get('order')?.value === 'asc' }"
                        for="asc"
                    >A - Z</label>

                    <input 
                        type="radio" 
                        name="order" 
                        id="desc" 
                        value="desc" 
                        formControlName="order"
                        class="hidden"
                    />
                    <label 
                        class="mt-8 text-white font-bold text-sm cursor-pointer p-2 bg-primary border border-primary rounded-lg overflow-hidden hover:bg-primary-hover"
                        [ngClass]="{ 'bg-primary-dark text-white': form.get('order')?.value === 'desc' }"
                        for="desc"
                    >Z - A</label>
                    </div>

                <div *ngIf="IsAdmin" class="w-full flex justify-center">
                    <button
                        type="button"
                        (click)="btnClick.emit()"
                        class="mt-9 text-white font-bold bg-primary px-4 py-2 border border-primary rounded-full hover:bg-primary-hover"
                    > {{ titleBtn }}</button>
                </div>
            </form>
    `,
    imports: [CommonModule, ReactiveFormsModule]
})
export class SearchBarComponent implements OnInit{

    @Input() form!: FormGroup;
    @Input() titleBtn: string = '';
    @Input() IsAdmin: boolean = false;
    @Output() btnClick = new EventEmitter<void>();


    public genders: Gender[] = [];
    
    constructor(
        private genderService: GenderService,
    ) {}

    ngOnInit(): void {
        this.getGenders();
    }

    getGenders(): void {
        this.genderService.getGenders().subscribe((data: any) => {
            this.genders = data;
        });    
    }
}