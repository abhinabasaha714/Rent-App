import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signup', () => {
    it('should register a new user if username is unique', () => {
      const user = { username: 'testUser', password: 'password123' };
      expect(service.signup(user)).toBeTrue();
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      expect(users).toContain(user);
    });

    it('should not register a user with an existing username', () => {
      const user = { username: 'testUser', password: 'password123' };
      service.signup(user);
      expect(service.signup(user)).toBeFalse();
    });
  });

  describe('login', () => {
    it('should login a user with correct credentials', () => {
      const user = { username: 'testUser', password: 'password123' };
      service.signup(user);
      expect(service.login(user)).toBeTrue();
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      expect(loggedInUser).toEqual(user);
    });

    it('should not login a user with incorrect credentials', () => {
      const user = { username: 'testUser', password: 'password123' };
      expect(service.login(user)).toBeFalse();
    });
  });

  describe('logout', () => {
    it('should clear the logged-in user and navigate to login', () => {
      const user = { username: 'testUser', password: 'password123' };
      service.signup(user);
      service.login(user);
      service.logout();
      expect(localStorage.getItem('loggedInUser')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if user is logged in', () => {
      const user = { username: 'testUser', password: 'password123' };
      service.signup(user);
      service.login(user);
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if no user is logged in', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });
  });
});
