import { Component, OnInit } from '@angular/core';
import { VerseService } from 'src/app/services/verse.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tags?: Tag[];

  constructor(verseService: VerseService) {
    verseService.getAllTags().subscribe((serverTags) => {
      this.tags = serverTags;
    });
  }

  ngOnInit(): void {}
}
