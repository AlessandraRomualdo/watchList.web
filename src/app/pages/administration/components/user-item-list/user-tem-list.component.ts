import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "../../../../services/user/user.type";

@Component({
    selector: 'app-user-item-list',
    standalone: true,
    template: `
        <div class="max-w-[1032px] w-full flex text-white justify-between items-center p-4 border-b bg-background-secondary shadow-lg hover:opacity-70 hover:bg-primary hover:text-black">
            <div class="flex flex-col gap-2 items-start">
                <h3 class="text-lg font-bold ">{{ user.name }}</h3>
                <p class="text-sm ">Email: {{ user.email }}</p>
            </div>
            <div class="flex space-x-2">
                <button type="button" class="px-4 py-2" (click)="onListUser()"><img src="/assets/icons/trello.svg" alt="icone de listas"></button>
                <button type="button" class="px-4 py-2" (click)="onEdit()"><img src="/assets/icons/edit.svg" alt="icone de editar"></button>
                <button type="button" class="px-4 py-2" (click)="onDelete()"><img src="/assets/icons/trash-2.svg" alt="icone de excluir"></button>

            </div>
        </div>   
    `,
    imports: [CommonModule]
})
export class UserListItemComponent {

    @Input() user!: User;
    @Output() editUser = new EventEmitter();
    @Output() deleteUser = new EventEmitter();
    @Output() listUser = new EventEmitter();

    onListUser(): void {
        this.listUser.emit(this.user);
    }

    onEdit(): void {
        this.editUser.emit(this.user);
    }

    onDelete(): void {
        this.deleteUser.emit(this.user);
    }
    
}