import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title in mat-card-title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Login');
  });

  it('should initialize form group', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('should display error whenn Username is touched and blank', () => {
    component.username.setValue('');
    component.username.markAsTouched();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#username-error').textContent).toContain('Username is required');
  });

  it('should display error whenn Password is touched and blank', () => {
    component.password.setValue('');
    component.password.markAsTouched();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#password-error').textContent).toContain('Password is required');
  });

  it('should not proceed when form is invalid', () => {
    component.username.setValue('1');
    component.password.setValue('');
    component.login();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should call login upon button click', () => {
    spyOn(component, 'login').and.callThrough();
    component.username.setValue('1');
    component.password.setValue('1');
    const ele = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    ele.click();
    expect(component.login).toHaveBeenCalled();
  });

  it('should display error on login fail', () => {
    component.username.setValue('1');
    component.password.setValue('1');
    // spyOn(component.authService, 'login').and.returnValue(throwError(() => new Error('Invalid username and password')));
    const btn = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    btn.click();
    setTimeout(() => {
      const ele = fixture.debugElement.nativeElement.querySelector('.alert');
      expect(ele).toBeTruthy();
    }, 2000)

  });

  it('should set isError to true if login fails', () => {
    component.username.setValue('1');
    component.password.setValue('1');
    const btn = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    btn.click();
    setTimeout(() => {
      expect(component.isError).toBeTruthy();
    }, 2000)
  });
});
