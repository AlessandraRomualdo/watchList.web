import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Obtém o token diretamente do localStorage
  const authToken = localStorage.getItem('token');
  
  // Se houver um token, clona a requisição e adiciona o cabeçalho de autorização
  const newReq = authToken ? req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  }) : req; // Se não houver token, continua com a requisição original

  // Passa a requisição (modificada ou original) para o próximo handler
  return next(newReq);
}
