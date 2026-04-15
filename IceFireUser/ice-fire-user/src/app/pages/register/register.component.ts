import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../state/auth.actions';
import { selectAuthLoading, selectAuthError, selectUser } from '../../state/auth.selectors';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  user$: Observable<any>;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
    this.user$ = this.store.select(selectUser);
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const { username, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      return;
    }
    this.store.dispatch(register({ username, password }));
  }
}
