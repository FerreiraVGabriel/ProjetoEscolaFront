import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserInputDTO } from '../../dtos/inputs/user-input.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  submitted = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
) {}

  protected form = this.fb.group({
    name: ['', Validators.required],
    password: [null, Validators.required],
  });

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      const name = this.form.value.name || ''; 
      const password = this.form.value.password || ''; 
      const userInput = new UserInputDTO(name, password);
      this.authService.login(userInput).subscribe(response => {
        if(response)
            this.router.navigate(['/students']);
      });
    }
  }

}
