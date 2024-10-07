import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-card-dashbord',
    standalone: true,
    template: `
        <div class="w-[250px] h-[200px] rounded-lg shadow-xl bg-background-secondary flex flex-col items-center justify-center gap-4">
            <h2 class="text-white font-bold text-2xl">{{ quantity }} - {{ title }} (s)</h2>
            <button
                (click)="manage.emit()"
                class="flex items-center mt-4 bg-primary text-white font-bold p-2 rounded-lg hover:bg-primary-hover"
            >
            <!-- <img class="ml-2" src="icons/settings.svg" alt="icone de engrenagem"> -->
            Gerenciar</button>
        </div>
    `,
    imports: []
})
export class CardDashbordComponent {

    @Input() title: string = '';
    @Input() quantity: number = 0;
    @Output() manage: EventEmitter<void> = new EventEmitter<void>();    

    constructor() {}
}