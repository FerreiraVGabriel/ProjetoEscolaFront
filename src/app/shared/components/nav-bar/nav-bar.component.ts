import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'; // Caso ainda não tenha
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isNavbarCollapsed = true;

    constructor(
                private authService: AuthService,
                private router: Router
  ) {}

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
