import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { VerseService } from 'src/app/services/verse.service';
import { Verse } from 'src/app/shared/models/Verse';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss'],
})
export class FoodPageComponent implements OnInit {
  food!: Verse;

  // constructor(
  //   activatedRoute: ActivatedRoute,
  //   verseService: VerseService,
  //   private cartService: CartService,
  //   private router: Router
  // ) {
  //   activatedRoute.params.subscribe((params) => {
  //     if (params['id']) this.food = verseService.getFoodByID(params['id']);
  //   });
  // }

  constructor(
    activatedRoute: ActivatedRoute,
    verseService: VerseService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        verseService.getVerseById(params['id']).subscribe((serverFood) => {
          this.food = serverFood;
        });
    });
  }

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
