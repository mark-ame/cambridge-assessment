import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss']
})
export class AddEditArticleComponent implements OnInit {
  CREATE = 0;
  UPDATE = 1;

  mode!: number;
  form!: FormGroup;
  id!: number
  article!: Article;
  cardTitle = "Create";
  buttonText = "Create";
  confirmationMessage = "Article created."
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private articleService: ArticlesService,
    private _snackBar: MatSnackBar
  ) {
    const stateParams = this.router.getCurrentNavigation()?.extras.state;
    if (stateParams) {
      if (stateParams["mode"] != null) {
        this.mode = stateParams["mode"];
        localStorage.setItem('mode', stateParams["mode"]);
      }
      if (stateParams["mode"] != null) {
        this.id = stateParams["id"];
        localStorage.setItem('id', stateParams["id"]);
      }
    }
  }

  ngOnInit(): void {
    this.initState();
    if (this.mode === this.CREATE) {
      this.initForm();
    } else {
      this.cardTitle = "Edit";
      this.buttonText = "Update";
      this.confirmationMessage = "Article updated.";
      this.articleService.getArticle(this.id).subscribe((article: any) => {
        this.article = article;
        this.initForm(article);
      })
    }
  }

  initState(): void {
    if (this.mode === undefined) {
      this.mode = parseInt(localStorage.getItem('mode') || this.CREATE.toString());
    }
    if (this.id === undefined) {
      this.id = parseInt(localStorage.getItem('id') || '');
    }
  }

  initForm(data?: Article) {
    this.form = this.formBuilder.group({
      id: [data?.id ? data.id : '', []],
      title: [data?.title ? data.title : '', Validators.required],
      description: [data?.description ? data.description : '', Validators.required]
    });
  }

  createUpdateArticle(mode: number): void {
    if (this.form.invalid) {
      return;
    }
    if(mode === this.CREATE) {
      this.createArticle();
    } else {
      this.updateArticle();
    }
  }

  private createArticle(): void {
    this.articleService.addArticle(this.form.value)
    .subscribe({
      next: (v) => {
        this._snackBar.open(this.confirmationMessage, '', {
          duration: 2000
        })
        this.form.reset();
      },
      error: (e) => {
        this._snackBar.open('Error creating article.', '', {
          duration: 2000
        })
      },
    })
  }

  private updateArticle(): void {
    this.articleService.updateArticle(this.form.value)
    .subscribe({
      next: (v) => {
        this._snackBar.open(this.confirmationMessage, '', {
          duration: 2000
        })
      },
      error: (e) => {
        this._snackBar.open('Error updating article.', '', {
          duration: 2000
        })
      },
    })
  }

  back(): void {
    this.router.navigate(['home']);
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }



}
