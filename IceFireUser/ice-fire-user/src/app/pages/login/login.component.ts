import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { login } from '../../state/auth.actions';
import { selectAuthLoading, selectAuthError, selectUser } from '../../state/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  user$: Observable<any>;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private store: Store) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
    this.user$ = this.store.select(selectUser);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { username, password } = this.loginForm.value;
    this.store.dispatch(login({ username, password }));
  }
}
