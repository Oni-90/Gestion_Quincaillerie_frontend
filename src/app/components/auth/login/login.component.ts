import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {email:'', password:''};
  successMessage: string = '';
  globalError: string = '';
  fieldsError: { [key: string]: string[] } = {};
  
  constructor(private authService:AuthService, private router:Router) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) =>{
        this.router.navigate(['dashboard'])
        console.log(response)
      },
      error: (error) => {
        if(error.status == 400) {
          //return field error if error status equal 400 
          this.fieldsError = error.error.errors; 
        }
        else if(error.status >= 500) {
          //return server if code status over or equal 500
          this.globalError = error.error.message;
        }
        else{
          this.globalError = error.error.message
        }
      }
    })
  }

}
