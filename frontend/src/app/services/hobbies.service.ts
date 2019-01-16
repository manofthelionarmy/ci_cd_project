import { Hobby } from './../models/hobbies.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  hobbiesSub: Subject<Hobby[]> = new Subject<Hobby[]>();
  hobbies: Hobby[] = [];

  constructor() { }
}
