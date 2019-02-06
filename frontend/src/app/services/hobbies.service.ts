import { HobbyModule } from './../hobby/hobby.module';
import { environment } from './../../environments/environment';
import { Hobby } from './../models/hobbies.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Location} from '@angular/common';

@Injectable()
export class HobbiesService {

  private hobbiesSub: Subject<Hobby[]> = new Subject<Hobby[]>();
  private hobbies: Hobby[] = [];

  constructor(private http: HttpClient) { }

  // I think it'll be easier to test my code if I don't subscribe because I want to also see if I get message metadata too

  getAllHobbies() {
    const url = `${environment.url}/api/v1/hobbies/getAll`;
    return this.http.get<{hobbies: any[], message: string}>(url)
              .pipe(map((res) => {
                return {
                  hobbies: res.hobbies.map(((hobby) => {
                    return {
                      id: hobby._id,
                      name: hobby.name,
                      hobby: hobby.hobby
                    };
                  })),
                  message: res.message
                };
              }))
              .subscribe((res) => {
                this.hobbies = res.hobbies;
                this.hobbiesSub.next([...this.hobbies]);
              });
  }

  // This may be the only thing we can test because this returns an Observable we can subscribe too...
  getHobbiesUpdatedList() {
    return this.hobbiesSub.asObservable();
  }

  addHobby(hobby: Hobby) {
    const url = `${environment.url}/api/v1/hobbies/addHobby`;
    return this.http.post<{hobbyId: any, message: string}>(url, hobby)
              .subscribe((res) => {
                hobby.id = res.hobbyId;
                this.hobbies.push(hobby);
                this.hobbiesSub.next([...this.hobbies]);
              });
  }
}
