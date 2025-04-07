import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
  
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showErrorToast(error);
          return throwError(() => error);
        })
      );
    }
  
    private showErrorToast(error: HttpErrorResponse): void {
      let message = 'Ocorreu um erro inesperado.';
      
      if (error.error.detail) {
        message = error.error.detail;
      }
  
      this.toastr.error(message);
    }
  }
  