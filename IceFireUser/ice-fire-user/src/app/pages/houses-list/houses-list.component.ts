import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HouseCardComponent } from '../../components/house-card/house-card.component';
import { HouseCardModel } from '../../models/house-card';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { addFavorite, removeFavorite } from '../../state/favorites.actions';
import { selectFavorites } from '../../state/favorites.selectors';
import { loadHouses } from '../../state/houses.actions';
import { selectHouses, selectHousesLoading, selectHousesError, selectTotalItems } from '../../state/houses.selectors';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
  imports: [CommonModule, RouterModule, HouseCardComponent]
})
export class HousesListComponent implements OnInit {
  readonly pageSize = 50;

  private searchSubject = new BehaviorSubject<string>('');

  houses$: Observable<HouseCardModel[]>;
  favorites$: Observable<HouseCardModel[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  currentPage = 1;

  search$ = this.searchSubject.asObservable();
  totalItems$ = this.store.select(selectTotalItems);
  totalItems = 0;
  totalPages = 1;

  constructor(private store: Store) {
    this.favorites$ = this.store.select(selectFavorites);
    this.loading$ = this.store.select(selectHousesLoading);
    this.error$ = this.store.select(selectHousesError);

    this.houses$ = combineLatest([
      this.store.select(selectHouses),
      this.searchSubject
    ]).pipe(
      map(([houses, search]) =>
        houses.filter(h =>
          (h.name || '').toLowerCase().includes(search.toLowerCase())
        )
      )
    );

    this.totalItems$.subscribe(total => {
      this.totalItems = total;
      this.totalPages = Math.ceil(total / this.pageSize);
    });
  }

  ngOnInit(): void {
    this.loadPage();

    this.houses$.subscribe(houses => {
      if (houses.length === 0 && this.currentPage > 1) {
        this.currentPage = 1;
        this.loadPage();
      }
    });
  }

  private loadPage(): void {
    this.store.dispatch(
      loadHouses({ page: this.currentPage, size: this.pageSize })
    );
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
    this.houses$.subscribe(houses => {
      this.currentPage = 1;
      this.totalItems = houses.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    });
  }

  firstPage(): void {
    if (this.currentPage !== 1) { 
      this.currentPage = 1;
      this.loadPage();
    }
  }

  lastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.loadPage();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage();
    }
  }

  toggleFavorite(house: HouseCardModel, favorites: HouseCardModel[]): void {
    const exists = favorites.some(f => f.url === house.url);
    console.log('TOGGLE FAVORITE', { house, exists });
    if (exists) {
      this.store.dispatch(removeFavorite({ houseId: house.url }));
    } else {
      this.store.dispatch(addFavorite({ house }));
    }
  }
}