import { Injectable } from "@angular/core";
import { CanActivateChild, Router } from "@angular/router";
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
    constructor(
        private router: Router,
    ) { }

    canActivateChild(): boolean {
        const token = localStorage.getItem('token');

        // Se o token não existir, redireciona para a página de login e retorna 'false'
        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }

        // Decodifica o token e verifica o conteúdo
        let decodedToken: any;
        try {
            decodedToken = jwt_decode.jwtDecode(token);
        } catch (error) {
            // Se houver um erro ao decodificar o token, redireciona para a página de login
            this.router.navigate(['/login']);
            return false;
        }

        // Verifica se as roles estão no token
        const userRoles = decodedToken.role || [];
        const allowedRoles = ['admin', 'editor'];

        // Verifica se o usuário tem alguma das roles permitidas
        const hasValidRole = allowedRoles.some(role => userRoles.includes(role));

        if (!hasValidRole) {
            // Redireciona para a página "não autorizado" se não tiver a role necessária
            this.router.navigate(['/homepage']);
            return false;
        }

        return true; // Permite acesso à rota se tudo estiver certo
    }
}
