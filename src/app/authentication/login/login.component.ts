import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AppApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private appApiService: AppApiService) {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.appApiService.login(this.loginForm.value.email!, this.loginForm.value.password!)
    }
  }
}
