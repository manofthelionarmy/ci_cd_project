import { Hobby } from './../models/hobbies.model';
import { HobbiesService } from './../services/hobbies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  hobbies: Hobby[] = [];

  sub: Subscription;

  // hobbiesObs: Observable<Hobby[]>;


  constructor(private hobbiesService: HobbiesService) { }

  ngOnInit() {

    this.hobbiesService.getAllHobbies();

    this.sub = this.hobbiesService.getHobbiesUpdatedList().subscribe((res) => {
      this.hobbies = res;
    });

    /*this.hobbiesObs = this.hobbiesService.getHobbiesUpdatedList();
    this.sub = this.hobbiesObs.subscribe((res) => {
      this.hobbies = res;
    });*/
  }

  ngOnDestroy() {

    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
