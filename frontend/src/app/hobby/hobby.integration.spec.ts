import { CommonModule } from '@angular/common';
import { Hobby } from './../models/hobbies.model';
import { HobbyModule } from './hobby.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { ListComponent } from './list/list.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HobbiesService } from '../services/hobbies.service';
import { Subject, Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

class HobbiesMockService {

  hobbies: Hobby[] = [];

  hobbiesSub: Subject<Hobby[]> = new Subject<Hobby[]>();

  constructor() {}

  getAllHobbies() {
    const data: Hobby[] = [{
      id: '1',
      name: 'Armando',
      hobby: 'guitar'
    }];
    const responseData: Observable<Hobby[]> = cold('---(d|)', {d: data});
    responseData.subscribe((res) => {
      this.hobbies = res;
      this.hobbiesSub.next([...this.hobbies]);
    });
  }

  getHobbiesUpdatedList() {
    return this.hobbiesSub.asObservable();
  }

  addHobby(h: Hobby) {
    this.hobbies.push(h);
    this.hobbiesSub.next([...this.hobbies]);
  }
}

describe('Integration Test of Hobby Module', () => {

  let listComponent: ListComponent;
  let hobbiesComponent: HobbiesComponent;
  let fixtureList: ComponentFixture<ListComponent>;
  let fixtureHobbies: ComponentFixture<HobbiesComponent>;

  let des: DebugElement[] = [];

  let button: HTMLElement;
  let li: HTMLElement;

  let service: HobbiesMockService = null;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HobbyModule
      ]
    }).overrideModule(HobbyModule, {
      set: {
        imports: [CommonModule, ReactiveFormsModule],
        declarations: [ListComponent, HobbiesComponent],
        exports: [ListComponent, HobbiesComponent],
        providers: [{provide: HobbiesService, useClass: HobbiesMockService}]
      }
    }).compileComponents();
  });

  beforeEach(() => {

    fixtureList = TestBed.createComponent(ListComponent);
    listComponent = fixtureList.componentInstance;

    fixtureHobbies  = TestBed.createComponent(HobbiesComponent);
    hobbiesComponent = fixtureHobbies.componentInstance;

    service = TestBed.get(HobbiesService);

    fixtureHobbies.detectChanges();
  });

  it('should create HobbiesComponent and ListComponent', () => {
    fixtureHobbies.detectChanges();
    expect(hobbiesComponent).toBeTruthy();

    fixtureList.detectChanges();
    expect(listComponent).toBeTruthy();
  });

  it('should get the injected HobbiesService', () => {
    expect(service).toBeTruthy();
  });

  it('should display hobbies', async () => {

    // ARRANGE
    const marble = getTestScheduler();
    spyOn(service, 'getAllHobbies').and.callThrough();
    spyOn(service, 'getHobbiesUpdatedList').and.callThrough();

    des = fixtureList.debugElement.queryAll(By.css('.list-group-item'));
    expect(des).not.toBe(null);

    // ACTION

    // fixtureList.ngOnInit
    fixtureList.detectChanges();

    marble.flush();

    // Update View
    fixtureList.detectChanges();

    des = fixtureList.debugElement.queryAll(By.css('.list-group-item'));

    li = des[0].nativeElement;

    // ASSERT

    expect(service.getAllHobbies).toHaveBeenCalledTimes(1);
    expect(service.getHobbiesUpdatedList).toHaveBeenCalledTimes(1);

    expect(li.textContent).toContain('Armando likes guitar');

  });

  it('should add a hobby to the ListComponent when HobbiesComponent clicks submit', async () => {

    // ARRANGE
    const marble = getTestScheduler();

    // ListComponent ngOnInit
    fixtureList.detectChanges();

    marble.flush();

    // Update View for ListComponent
    fixtureList.detectChanges();


    // Spy on hobbiesComponent and call through
    spyOn(hobbiesComponent, 'onSubmit').and.callThrough();
    // Spy on service.addHobby and call through
    spyOn(service, 'addHobby').and.callThrough();

    // Spy on the validity of the form (if there is filled in info or not)
    spyOnProperty(hobbiesComponent.hobbiesForm, 'invalid');

    // Set the values in the form
    hobbiesComponent.hobbiesForm.controls['name'].setValue('Isaiah');
    hobbiesComponent.hobbiesForm.controls['hobby'].setValue('basketball');

    // Get the Submit button element from HobbiesComponent
    button = fixtureHobbies.debugElement.query(By.css('button')).nativeElement;
    // Click the button to trigger HobbiesComponent onSubmit function
    button.click();

    // Checking if our spies have been called
    expect(hobbiesComponent.onSubmit).toHaveBeenCalledTimes(1);
    expect(service.addHobby).toHaveBeenCalledTimes(1);

    // Update ListComponent View
    fixtureList.detectChanges();

    // Update HobbiesComponent View after Submit has been clicked
    fixtureHobbies.detectChanges();

    // After Submit has been clicked, the form should reset
    expect(hobbiesComponent.hobbiesForm.valid).toBeFalsy();

    // Get the li-tags with class .list-group-item
    des = fixtureList.debugElement.queryAll(By.css('.list-group-item'));

    li = des[0].nativeElement;

    expect(li.textContent).toContain('Armando likes guitar');

    li = des[1].nativeElement;

    expect(li.textContent).toContain('Isaiah likes basketball');
  });

  it('should not add a hobby to the ListComponent when HobbiesComponent form is invalid', async() => {

    // ARRANGE
    const marble = getTestScheduler();

    // ListComponent ngOnInit
    fixtureList.detectChanges();

    marble.flush();

    // Update View for ListComponent
    fixtureList.detectChanges();


    // Spy on hobbiesComponent and call through
    spyOn(hobbiesComponent, 'onSubmit').and.callThrough();
    // Spy on service.addHobby and call through
    spyOn(service, 'addHobby').and.callThrough();

    // Set the values in the form
    hobbiesComponent.hobbiesForm.controls['name'].setValue('');
    hobbiesComponent.hobbiesForm.controls['hobby'].setValue('');

    // Get the Submit button element from HobbiesComponent
    button = fixtureHobbies.debugElement.query(By.css('button')).nativeElement;
    // Click the button to trigger HobbiesComponent onSubmit function
    button.click();

    // Checking if our spies have been called
    expect(hobbiesComponent.onSubmit).toHaveBeenCalledTimes(1);

    // The form should be invalid
    expect(hobbiesComponent.hobbiesForm.valid).toBeFalsy();

    // Should not call because form is invalid
    expect(service.addHobby).toHaveBeenCalledTimes(0);

    // Update ListComponent View
    fixtureList.detectChanges();

    // Update HobbiesComponent View after Submit has been clicked
    fixtureHobbies.detectChanges();

    // After Submit has been clicked, the form should still be invalid
    expect(hobbiesComponent.hobbiesForm.invalid).toBeTruthy();

    des = fixtureList.debugElement.queryAll(By.css('.list-group-item'));

    // The list component should only have 1 li-element
    expect(des.length).toEqual(1);

    li = des[0].nativeElement;

    // That li-element is the one we initialized in our HobbiesMockService class
    expect(li.textContent).toContain('Armando likes guitar');

  });
});
