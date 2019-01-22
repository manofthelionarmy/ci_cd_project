import { Observable, Subject } from 'rxjs';
import { Hobby } from './../models/hobbies.model';
import { HobbiesService } from './../services/hobbies.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HobbiesComponent } from './hobbies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('HobbiesComponent', () => {
  // component object
  let component: HobbiesComponent;
  // fixture object (what does this do?)
  let fixture: ComponentFixture<HobbiesComponent>;
  // What is this object
  let de: DebugElement;
  // Allows me to grab any HTML object
  let el: HTMLElement;

  /**const HobbiesServiceStub  {
    addHobby: (hobby: Hobby) => {},
    getAllHobbies: () => {
      const hobbies: Hobby[] = [];
      const hobby1: Hobby = {
        id: null,
        name: 'Armando',
        hobby: 'coding'
      };
      const hobby2: Hobby = {
        id: null,
        name: 'Armando',
        hobby: 'coding'
      };
      hobbies.push(hobby1, hobby2);
      return [...hobbies];
    },
  };*/

  // Created a stub class to have an HttpTesting Controller... I'm not so sure if I need this right now.
  // I guess it depends on what I want to test. I want to make sure when the button is clicked, that it adds the metadata appropriately
  // But Angular says: Only test the component: https://angular.io/guide/testing#provide-service-test-doubles
  /**
   * The documentation above says our goal is to test the component, not the service. Testing the service will and component will be a
   * nightmare.
   */
  // Created a Mock Service of HobbiesService
  class HobbiesMockService {

    hobbies: Hobby[] = [];

    hobbiesSub: Subject<Hobby[]> = new Subject<Hobby[]>();

    constructor() {}

    addHobby(hobby: Hobby): void {
      this.hobbies.push(hobby);
    }

    getAllHobbies() {

      const hobby1: Hobby = {
        id: null,
        name: 'Armando',
        hobby: 'coding'
      };
      const hobby2: Hobby = {
        id: null,
        name: 'Isaiah',
        hobby: 'basketball'
      };
      this.hobbies.push(hobby1, hobby2);
      this.hobbiesSub.next([...this.hobbies]);
    }

    getHobbiesUpdatedList(): Observable<Hobby[]> {
      return this.hobbiesSub.asObservable();
    }
  }

  /*const HobbiesServiceStub2: jasmine.SpyObj<HobbiesService> =
                jasmine.createSpyObj('HobbiesService', ['addHobby', 'getAllHobbies', 'getHobbiesUpdatedList']);*/

  // HobbiesServiceStub2.addHobby.and.callFake(() => {});

  let hobbiesService: HobbiesService;


  // Before each test, initialize the TestBed
  // Here, you declare your imports (modules) and declare your components
  beforeEach(async(() => {

    // Both solutions work: This one overrides the providers of the component
    // Don't need HttpTestingModule for this to work. Completely replacing the service suffices
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ HobbiesComponent ],
    }).overrideComponent(HobbiesComponent, {
      set: {
        providers: [
          {provide: HobbiesService, useClass: HobbiesMockService}
        ]
      }
    })
    .compileComponents();
    // This overrides the providers for the root module
    // Works because we only have one module: the root module
    /*TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [HobbiesComponent],
      providers: [{provide: HobbiesService, useClass: HobbiesServiceStub}]
    }).compileComponents();**/
  }));

  // Before each test, initialize each fixture
  // Make sure it detects Changes
  // Initialize the component
  // Initialize the Debug Element
  // Initialize the HTMLElement
  beforeEach(() => {
    fixture = TestBed.createComponent(HobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;

    // The injected service retrieved is actually our HobbiesMockService
    hobbiesService = fixture.debugElement.injector.get(HobbiesService);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit method', async() => {
    // fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('form should be invalid', async() => {
    component.hobbiesForm.controls['name'].setValue('');
    component.hobbiesForm.controls['hobby'].setValue('');
    expect(component.hobbiesForm.valid).toBeFalsy();
  });

  it('form should be valid', async() => {
    component.hobbiesForm.controls['name'].setValue('Isaiah');
    component.hobbiesForm.controls['hobby'].setValue('basketball');
    expect(component.hobbiesForm.valid).toBeTruthy();
  });

  it('form should be reset after onSubmit if the form is valid', async() => {

    spyOn(component.hobbiesForm, 'reset');

    component.hobbiesForm.controls['name'].setValue('Isaiah');
    component.hobbiesForm.controls['hobby'].setValue('basketball');

    /*
    // Before the click, check if the form is valid
    expect(component.hobbiesForm.valid).toBeTruthy();
    // after the click, check if the form is invalid meaning the form has been reset
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();

    expect(component.hobbiesForm.reset).toHaveBeenCalledTimes(1);
    fixture.detectChanges();
    expect(component.hobbiesForm.valid).toBeFalsy();
    */

    expect(component.hobbiesForm.valid).toBeTruthy();

    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();


    // Checking if the reset function has been called
    expect(component.hobbiesForm.reset).toHaveBeenCalledTimes(1);

    // Even after reset has been called, the values haven't been reset expect(component.hobbiesForm.value.name).toEqual('');
    // Seems like I have to spy on the property after the click
    spyOnProperty(component.hobbiesForm, 'valid');

    // Check if there is a change in values
    expect(component.hobbiesForm.valueChanges).toBeTruthy();
    // Check if the form is invalid (meaning it has been reset with empty values)
    expect(component.hobbiesForm.valid).toBeFalsy();

  });
  it('should call HobbiesService.addHobby function when the form is valid', async() => {
    spyOn(hobbiesService, 'addHobby');
    // spyOnProperty(component.hobbiesForm, 'valid');

    component.hobbiesForm.controls['name'].setValue('Evan');
    component.hobbiesForm.controls['hobby'].setValue('drawing');

    fixture.detectChanges();

    expect(component.hobbiesForm.invalid).toBeFalsy();

    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();

    expect(hobbiesService.addHobby).toHaveBeenCalledTimes(1);
  });
});
