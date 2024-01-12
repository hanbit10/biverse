import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { VerseService } from 'src/app/services/verse.service';
import { Verse } from 'src/app/shared/models/Verse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  foods: Verse[] = [];

  constructor(
    private verseService: VerseService,
    activatedRoute: ActivatedRoute
  ) {
    let foodsObservalbe: Observable<Verse[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        foodsObservalbe = this.verseService.getAllVersesBySearchTerm(
          params['searchTerm']
        );
      else if (params['tag'])
        foodsObservalbe = this.verseService.getAllVersesByTag(params['tag']);
      else foodsObservalbe = verseService.getAll();

      foodsObservalbe.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }

  ngOnInit(): void {}
}
