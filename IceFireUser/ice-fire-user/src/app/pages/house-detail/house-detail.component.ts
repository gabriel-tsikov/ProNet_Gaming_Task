import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HouseDetailModel } from '../../models/house-details';
import { HousesService } from '../../services/houses.service';
import { EmptyHeartComponent } from '../../assets/svg/empty-heart.component';
import { Store } from '@ngrx/store';
import { addFavorite, removeFavorite } from '../../state/favorites.actions';
import { selectFavorites } from '../../state/favorites.selectors';
import { HouseCardModel } from '../../models/house-card';
import { Observable } from 'rxjs';
import { FullHeartComponent } from '../../assets/svg/full-heart.component';

@Component({
  selector: 'app-house-detail',
  imports: [CommonModule, RouterModule, EmptyHeartComponent, FullHeartComponent],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.scss'
})
export class HouseDetailComponent {
  house: HouseDetailModel | null = null;
  isLoading = true;
  error: string | null = null;
  favorites$: Observable<HouseCardModel[]>;

  constructor(
    private route: ActivatedRoute,
    private housesService: HousesService,
    private store: Store
  ) {
    this.favorites$ = this.store.select(selectFavorites);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.housesService.getHouseById(id).subscribe({
        next: (house) => {
          this.house = house;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load house details.';
          this.isLoading = false;
        }
      });
    } else {
      this.error = 'No house ID provided.';
      this.isLoading = false;
    }
  }

  isFavorite(houseUrl: string | undefined | null, favorites: HouseCardModel[]): boolean {
    if (!houseUrl) return false;
    return favorites.some(fav => fav.url === houseUrl);
  }

  toggleFavorite(house: HouseDetailModel, favorites: HouseCardModel[]) {
    if (!house?.url) return;
    if (favorites.some(fav => fav.url === house.url)) {
      this.store.dispatch(removeFavorite({ houseId: house.url }));
    } else {
      this.store.dispatch(addFavorite({ house }));
    }
  }
}
