import { Verse } from './Verse';

export class CartItem {
  constructor(public food: Verse) {}
  quantity: number = 1;
  price: number = this.food.price;
}
