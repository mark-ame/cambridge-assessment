import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  apiUrl = 'http://localhost:3000/articles';
  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.apiUrl + '/' + id);
  }

  searchArticles(query: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl + query);
  }

  addArticle(article: Article) {
    return this.http.post<Article>(this.apiUrl, article);
  }

  updateArticle(article: Article) {
    return this.http.put<Article>(this.apiUrl + '/' + article.id, article);
  }

}
