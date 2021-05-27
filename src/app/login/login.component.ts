import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  errMessage: string = '';

  constructor(private cookieService: CookieService, private route: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        pwd: new FormControl('', Validators.required),
      },
      {}
    );
  }

  login() {
    console.log(
      this.loginForm.value,
      this.cookieService.get('email'),
      this.cookieService.get('pwd')
    );
    if (
      this.loginForm.value.email == this.cookieService.get('email') &&
      this.loginForm.value.pwd == this.cookieService.get('pwd')
    ) {
      localStorage.setItem('loggedIn', 'true');
      this.route.navigate(['/product-details']);
    } else {
      this.errMessage = 'Please check email or password';
      console.log(this.errMessage);
      localStorage.setItem('loggedIn', 'false');
    }
  }
}
