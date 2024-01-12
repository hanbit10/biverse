import { Injectable } from '@angular/core';
import { Verse } from '../shared/models/Verse';
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

  getAll(): Observable<Verse[]> {
    return this.http.get<Verse[]>(VERSES_URL);
  }

  getAllVersesBySearchTerm(searchTerm: string) {
    return this.http.get<Verse[]>(VERSES_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(VERSES_TAGS_URL);
  }

  getAllVersesByTag(tag: string): Observable<Verse[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<Verse[]>(VERSES_BY_TAG_URL + tag);
  }

  getVerseById(foodId: string): Observable<Verse> {
    return this.http.get<Verse>(VERSE_BY_ID_URL + foodId);
  }

  create(data: any): Observable<Verse> {
    return this.http.post<Verse>(VERSES_URL, data);
  }
}
