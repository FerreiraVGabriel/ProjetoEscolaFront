import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInputDTO } from '../dtos/inputs/user-input.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private httpclient: HttpClient) {}


  login(userInput: UserInputDTO) {
    return this.httpclient.post<any>(`${this.baseUrl}/Authentication/Login`, userInput)
      .pipe(
        map(tokenKey => {
          localStorage.setItem('auth_token', tokenKey.Token);
          return true;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}