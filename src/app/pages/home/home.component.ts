import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articleList!: Observable<Article[]>;
  CREATE = 0;
  UPDATE = 1;
  userName = ';'

  constructor(
    private articleService: ArticlesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '');
    this.userName = user.username;
    this.articleList = this.articleService.getArticles();
  }

  onAdd(): void {
    const stateParams = {
      state: {
        mode: this.CREATE,
      },
    };
    this.router.navigate(['article'], stateParams)
  }
  
  updateResults(data: Observable<Article[]>) {
    this.articleList = data;
  }

}
