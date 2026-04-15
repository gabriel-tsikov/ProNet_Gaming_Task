import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HouseCardModel } from '../../models/house-card';
import { EmptyHeartComponent } from '../../assets/svg/empty-heart.component';
import { FullHeartComponent } from '../../assets/svg/full-heart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss'],
  imports: [RouterModule, EmptyHeartComponent, FullHeartComponent, CommonModule]
})
export class HouseCardComponent {
  @Input() house!: HouseCardModel;
  @Input() favorites: HouseCardModel[] = [];
  @Output() favoriteToggled = new EventEmitter<HouseCardModel>();

  getHouseId(): string {
    return this.house.url.split('/').pop() || '';
  }

  isFavorite(): boolean {
    return this.favorites.some(fav => fav.url === this.house.url);
  }

  onToggleFavorite() {
    this.favoriteToggled.emit(this.house);
  }
}
