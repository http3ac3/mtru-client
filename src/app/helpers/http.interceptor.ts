import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  if (!token) token = ''; 
  const cloneRequest = req.clone({
    setHeaders : { 
      Authorization : `Bearer ` + token
    }
  })

  return next(cloneRequest);
};
