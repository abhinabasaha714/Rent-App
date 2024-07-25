import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';

class MockAuthService {
  loginStatus = new Subject<boolean>();
  login(user: any) {
    return user.username === 'validUsername' && user.password === 'validPassword';
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, 
        FormsModule,
        CommonModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMessage when login fails', () => {
    component.username = 'invalidUsername';
    component.password = 'invalidPassname';
    component.login();
    expect(component.errorMessage).toBe('Invalid username or password!');
  });
  it('should navigate to home on successful login', () => {
    spyOn(router, 'navigate');
    component.username = 'validUsername';
    component.password = 'validPassword';
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call AuthService login method with correct credentials', () => {
    const spy = spyOn(authService, 'login').and.callThrough();
    component.username = 'testUsername';
    component.password = 'testPassname';
    component.login();
    expect(spy).toHaveBeenCalledWith({ username: 'testUsername', password: 'testPassname' });
  });
});
