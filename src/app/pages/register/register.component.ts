import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 resText!:string ;
 loading:boolean = false
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, { validators: this.compare });
  
  compare(fGroup: AbstractControl) {

    return fGroup.get('password')?.value === fGroup.get('rePassword')?.value ? null : { missMatch: true }
  }

  register(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      console.log(this.registerForm.value);
      this._AuthService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false
          this._Router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.resText = err.error.message;
          this.loading = false;
        }
      })
    } else {
      this.registerForm.setErrors({ missMatch: true });
      this.registerForm.markAllAsTouched();
    }

  }

}
