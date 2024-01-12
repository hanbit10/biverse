import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
//import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  VERSES_BY_SEARCH_URL,
  VERSES_BY_TAG_URL,
  VERSES_TAGS_URL,
  VERSES_URL,
  VERSE_BY_ID_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class VerseService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(VERSES_URL);
  }

  getAllVersesBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(VERSES_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(VERSES_TAGS_URL);
  }

  getAllVersesByTag(tag: string): Observable<Food[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<Food[]>(VERSES_BY_TAG_URL + tag);
  }

  getVerseById(foodId: string): Observable<Food> {
    return this.http.get<Food>(VERSE_BY_ID_URL + foodId);
  }

  create(data: any): Observable<Food> {
    return this.http.post<Food>(VERSES_URL, data);
  }
}
