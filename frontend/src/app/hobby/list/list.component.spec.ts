import { CommonModule } from '@angular/common';
import { HobbyModule } from './../hobby.module';
import { Hobby } from './../../models/hobbies.model';
import { HobbiesService } from './../../services/hobbies.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { Subject, Observable, of, observable, defer, Subscription } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { cold, hot, getTestScheduler} from 'jasmine-marbles';



class MockHobbiesService {
  hobbies: Hobby[] = [];

  hobbiesSub: Subject<Hobby[]> = new Subject<Hobby[]>();

  constructor() {}

  getAllHobbies = () => {
    this.hobbiesSub.next([...this.hobbies]);
  }

  addHobby = (h: Hobby) => {
    this.hobbies.push(h);

    this.hobbiesSub.next([...this.hobbies]);
  }

  getHobbiesUpdatedList =  () => {
    return this.hobbiesSub.asObservable();
  }
}


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let de: DebugElement[] = [];

  let el: HTMLElement;

  let service = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HobbyModule],
    }).overrideModule(HobbyModule, {
      set: {
        imports: [CommonModule],
        declarations: [ListComponent],
        exports: [ListComponent],
        providers: [{provide: HobbiesService, useClass: MockHobbiesService}]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(HobbiesService);
    /**The code below was the one causing me trouble. >:(
     * Don't do fixture.detectChange(). Set up spies in each test then call fixture.detectChanges()
    */
    // fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getAllHobbies on ngOnInit', async () => {

    const data: Hobby[] = [];

    spyOn(service, 'getAllHobbies').and.callFake(() => {
      // service.hobbies.push(...data);
    });

    const responseData$ = cold('---d|', { d: data });

    spyOn(service, 'getHobbiesUpdatedList').and.returnValue(responseData$);

    const marble = getTestScheduler();

    marble.flush();

    fixture.detectChanges();

    expect(service.getAllHobbies).toHaveBeenCalledTimes(1);
  });

  it('should call getHobbiesUpdatedList on ngOnInit', async() => {
    const data: Hobby[] = [];

    spyOn(service, 'getAllHobbies').and.callFake(() => {
      // service.hobbies.push(...data);
    });

    const responseData$ = cold('---d|', { d: data });

    spyOn(service, 'getHobbiesUpdatedList').and.returnValue(responseData$);

    getTestScheduler().flush();

    fixture.detectChanges();

    expect(service.getHobbiesUpdatedList).toHaveBeenCalledTimes(1);
  });

  it('should display hobby when it recieves response data',  async () => {

    // fixture.detectChanges();
    const marble = getTestScheduler();
    const data: Hobby[] = [{
      id: '1',
      name: 'Armando',
      hobby: 'guitar'
    }];

    // https://angular.io/guide/rx-library#naming-conventions-for-observables
    const responseData$: Observable<Hobby[]> = cold('---(d|)', { d: data });

    spyOn(service, 'getAllHobbies').and.callFake(() => {

    });

    spyOn(service, 'getHobbiesUpdatedList').and.returnValue(
     responseData$
    );


    expect(de).not.toBeNull();

    // Invoke ngOnInit
    fixture.detectChanges();

    marble.flush();

    de = fixture.debugElement.queryAll(By.css('.list-group-item'));

    expect(service.getAllHobbies).toHaveBeenCalledTimes(1);
    expect(service.getHobbiesUpdatedList).toHaveBeenCalledTimes(1);

    // View hasn't rendered yet
    expect(de[0]).toBeUndefined();
    // Update View, angular documentation to the rescue again:
    fixture.detectChanges(); // triggers ngAfterViewInit

    // View has rendered
    de = fixture.debugElement.queryAll(By.css('.list-group-item'));
    el = de[0].nativeElement;
    expect(el.textContent).toContain('Armando likes guitar');

  });

  it('should render a new item in the list when addHobby is called', () => {

    const data: Hobby[] = [{
      id: '1',
      name: 'Evan',
      hobby: 'drawing'
    }];

    const hobby: Hobby = {
      id: '2',
      name: 'Isaiah',
      hobby: 'basketball'
    };

    const marble = getTestScheduler();

    const responseData$: Observable<Hobby[]> = cold('---(d|)', {d: data});

    spyOn(service, 'getAllHobbies').and.callFake(() => {

      responseData$.subscribe((res) => {
        service.hobbies = res;
        service.hobbiesSub.next([...service.hobbies]);
      });

    });

    spyOn(service, 'getHobbiesUpdatedList').and.returnValue( service.hobbiesSub.asObservable() );

    // spyOn(service, 'addHobby');

    fixture.detectChanges();

    marble.flush();

    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('.list-group-item'));

    expect(de[0].nativeElement).toBeDefined();

    el = de[0].nativeElement;

    expect(el.textContent).toContain('Evan likes drawing');


    service.addHobby(hobby);

    fixture.detectChanges();

    de = fixture.debugElement.queryAll(By.css('.list-group-item'));

    expect(de[1].nativeElement).toBeDefined();

    el = de[1].nativeElement;

    expect(el.textContent).toContain('Isaiah likes basketball');
  });

});
