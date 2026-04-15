import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { favoritesReducer } from './state/favorites.reducer';

import { routes } from './app.routes';
import { authInterceptor } from './services/auth.interceptor';
import { authReducer } from './state/auth.reducer';
import { housesReducer } from './state/houses.reducer';
import { AuthEffects } from './state/auth.effects';
import { provideEffects } from '@ngrx/effects';
import { FavoritesEffects } from './state/favorites.effects';
import { HousesEffects } from './state/houses.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      favorites: favoritesReducer,
      houses: housesReducer,
      auth: authReducer,
    }),
    provideEffects([AuthEffects, FavoritesEffects, HousesEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
