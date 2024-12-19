import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: Login;

  constructor(private http: HttpClient,private router: Router) {
    this.loginObj = new Login();
  }

  OnLogin() {
    if (!this.loginObj.EmailId || !this.loginObj.Password) {
      alert('Please fill in both Email and Password.');
      return;
    }
  
    this.http.post('/api/User/Login', this.loginObj).subscribe({
      next: (res: any) => {
        if (res && res.result) { 
          alert('Login Success');
          this.router.navigate(['/dashboard']); 
        } else {
          alert(res?.message || 'Login failed');
        }
      },
      error: (error) => {
        console.error('Error during login:', error);
        alert('An error occurred while logging in. Please try again.');
      }
    });
  }

  
}

export class Login {
  
  EmailId: string;
  Password: string
  constructor() {
    this.EmailId = '',
    this.Password = ''
  }
}
