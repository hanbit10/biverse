import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
})
export class UploadPageComponent implements OnInit {
  tradeOptionRadioButton = ['sell', 'buy'];
  informationType = [
    {
      sellOption: 'I want',
      title: 'Title',
      category: 'Category',
      price: 'Price',
      district: 'District',
      description: 'Description',
      image: 'Image',
    },
  ];

  categoryType = [
    { category: 'Shoes' },
    { category: 'Electronics' },
    { category: 'Etc.' },
  ];

  districtType = [
    { place: 'Aachen Mitte' },
    { place: 'Brand' },
    { place: 'Eilendorf' },
    { place: 'Haarem' },
    { place: 'Kornelimünster Walheim' },
    { place: 'Laurensberg' },
    { place: 'Richterich' },
  ];

  productForm!: FormGroup;
  //screenMode: string;
  imageData!: string;

  foods: Food[] = [];

  constructor(
    private formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    private foodService: FoodService
  ) {
    let foodsObservalbe: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        foodsObservalbe = this.foodService.getAllFoodsBySearchTerm(
          params['searchTerm']
        );
      else if (params['tag'])
        foodsObservalbe = this.foodService.getAllFoodsByTag(params['tag']);
      else foodsObservalbe = foodService.getAll();

      foodsObservalbe.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      tradeOption: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      district: ['', Validators.required],
    });

    // let screenWidth = window.innerWidth;
    // screenWidth > 767
    //   ? (this.screenMode = 'web')
    //   : (this.screenMode = 'mobile');
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   let screenWidth = window.innerWidth;
  //   screenWidth > 767
  //     ? (this.screenMode = 'web')
  //     : (this.screenMode = 'mobile');
  //   console.log(this.screenMode);
  // }

  addProduct() {}

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.productForm.patchValue({ image: file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
