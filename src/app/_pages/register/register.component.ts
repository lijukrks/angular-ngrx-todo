import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get formControls() { return this.loginForm.controls; }

  login(value){
    this.authenticationService.register(value.email, value.password).subscribe((user) => {
      this.router.navigate(['/login-page']);
    }, err => {
      this.router.navigate(['/login-page']);
    });
  }
}
