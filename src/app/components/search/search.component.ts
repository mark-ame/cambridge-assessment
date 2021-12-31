import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<any>();

  searchForm!: FormGroup
  searchResults!: Observable<Article[]>
  
  constructor(
    private fb: FormBuilder,
    private articleService: ArticlesService
    ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keyword: ['',''],
      filter: [0,'']
    })
  }

  search(): void {
    const query = this.buildQuery();
    this.searchResults = this.articleService.searchArticles(query);
    this.searchEvent.emit(this.searchResults);
  }

  buildQuery(): string {
    let queryProp = ''
    switch (this.filter.value) {
      case 1:
        queryProp = 'title_like'
        break;
      case 2:
        queryProp = 'description_like'
        break;
      default:
        queryProp = 'q' 
        break;
    }
    const query = '?' + queryProp + "=" + this.keyword.value;
    return query;
  }

  get keyword(): FormControl {
    return this.searchForm.get('keyword') as FormControl;
  }

  get filter(): FormControl {
    return this.searchForm.get('filter') as FormControl;
  }

}
