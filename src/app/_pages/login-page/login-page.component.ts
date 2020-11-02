import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from  '../../_models/User';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  error = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get formControls() { return this.loginForm.controls; }

  login(formValues){
    this.authenticationService.login(formValues.email, formValues.password).subscribe((user: User) => {
      this.router.navigate(['/list_page']);
    }, err => {
      this.error = false;
      this.router.navigate(['/login-page']);
    });
  }

}
