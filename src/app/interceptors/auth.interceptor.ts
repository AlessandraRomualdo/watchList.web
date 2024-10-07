import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token'); // Obtem o token do localStorage
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}` // Adiciona o token ao cabeçalho Authorization
                }
            });
        }
        return next.handle(request); // Continua com a requisição
    }
}
