import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { VerseService } from 'src/app/services/verse.service';
import { Verse } from 'src/app/shared/models/Verse';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
})
export class UploadPageComponent {
  cookTimeOption = ['30', '40'];

  verseTags = [
    'Inspiration',
    'Grace',
    'Redemption',
    'Faith',
    'Harmony',
    'Truth',
    'Hope',
    'Mercy',
    'Wisdom',
    'Love',
  ];

  food: Verse = {
    name: '',
    price: 100,
    tags: [],
    favorite: false,
    stars: 0,
    imageUrl: 'assets/food-1.jpg',
    origins: ['dsdds'],
    cookTime: '',
    id: '132',
  };

  constructor(
    private formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    private verseService: VerseService
  ) {
    // let foodsObservalbe: Observable<Verse[]>;
    // activatedRoute.params.subscribe((params) => {
    //   if (params['searchTerm'])
    //     foodsObservalbe = this.verseService.getAllVersesBySearchTerm(
    //       params['searchTerm']
    //     );
    //   else if (params['tag'])
    //     foodsObservalbe = this.verseService.getAllVersesByTag(params['tag']);
    //   else foodsObservalbe = verseService.getAll();
    //   foodsObservalbe.subscribe((serverFoods) => {
    //     this.foods = serverFoods;
    //   });
    // });
  }

  saveFood(): void {
    const data = {
      name: this.food.name,
      price: this.food.price,
      tags: this.food.tags,
      favorite: this.food.favorite,
      stars: this.food.stars,
      imageUrl: this.food.imageUrl,
      origins: this.food.origins,
      cookTime: this.food.cookTime,
    };

    this.verseService.create(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }

  addProduct() {}

  // onFileSelect(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   this.productForm.patchValue({ image: file });
  //   const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  //   if (file && allowedMimeTypes.includes(file.type)) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageData = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
}
