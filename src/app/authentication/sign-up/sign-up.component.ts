import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AppApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private appApiService: AppApiService) { }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.appApiService.signUp(this.signUpForm.value.email!, this.signUpForm.value.password!);
    }
  }
}
