import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HouseCardModel } from '../../models/house-card';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../../state/favorites.selectors';
import { HouseCardComponent } from '../../components/house-card/house-card.component';
import { CommonModule } from '@angular/common';
import { removeFavorite } from '../../state/favorites.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [HouseCardComponent, CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favorites$: Observable<HouseCardModel[]>;

  constructor(private store: Store) {
    this.favorites$ = this.store.select(selectFavorites);
  }

  removeFromFavorites(house: HouseCardModel) {
    this.store.dispatch(removeFavorite({ houseId: house.url }));
  }
}
