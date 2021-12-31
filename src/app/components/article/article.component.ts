import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article!: Article
  CREATE = 0;
  UPDATE = 1;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onEdit(id: number): void {
    const stateParams = {
      state: {
        mode: this.UPDATE,
        id
      },
    };
    this.router.navigate(['article'], stateParams)
  }

}
