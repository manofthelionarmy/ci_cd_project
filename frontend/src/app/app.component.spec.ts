import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HobbiesComponent } from './hobby/hobbies/hobbies.component';
import { HeaderComponent } from './header/header.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

/**
 * Followed this from the documentation
 * https://angular.io/guide/testing#stubbing-unneeded-components
 */
@Component({selector: 'app-header', template: ''})
class HeaderStubComponent {}

@Component({selector: 'app-hobbies', template: ''})
class HobbiesStubComponent {}

@Component({selector: 'app-list', template: ''})
class ListStubComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderStubComponent,
        HobbiesStubComponent,
        ListStubComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
