import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HousesListComponent } from './pages/houses-list/houses-list.component';
import { HouseDetailComponent } from './pages/house-detail/house-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'houses', component: HousesListComponent },
    { path: 'houses/:id', component: HouseDetailComponent },
    { path: 'favorites', component: FavoritesComponent },
  ];
  
