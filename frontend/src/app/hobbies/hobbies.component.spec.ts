import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesComponent } from './hobbies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { debug } from 'util';


describe('HobbiesComponent', () => {
  // component object
  let component: HobbiesComponent;
  // fixture object (what does this do?)
  let fixture: ComponentFixture<HobbiesComponent>;
  // What is this object
  let de: DebugElement;
  // Allows me to grab any HTML object
  let el: HTMLElement;

  // Before each test, initialize the TestBed
  // Here, you declare your imports (modules) and declare your components
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ HobbiesComponent ]
    })
    .compileComponents();
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
});
