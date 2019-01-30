import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authenticator: AuthService) { }

  ngOnInit() { }

  // Make a log on method
  login() {
    const userName = this.loginForm.controls['userName'].value;
    const password = this.loginForm.controls['password'].value;
    this.authenticator.login(userName, password);
  }

}