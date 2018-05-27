import { Component, Input } from '@angular/core';

@Component({
  selector: 'rating-star',
  templateUrl: 'rating-star.html'
})
export class RatingStarComponent {
  @Input() rating: number;
}
