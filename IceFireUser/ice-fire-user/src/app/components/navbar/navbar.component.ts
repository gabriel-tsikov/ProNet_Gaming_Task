import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/auth.selectors';
import { logout } from '../../state/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, HamburgerMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuOpen = false;
  childrenOpen = false;
  user$: Observable<any>;

  constructor(public authService: AuthService, private store: Store) {
    this.user$ = this.store.select(selectUser);
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleChildren() {
    this.childrenOpen = !this.childrenOpen;
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
