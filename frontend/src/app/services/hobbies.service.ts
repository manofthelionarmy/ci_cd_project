import { environment } from './../../environments/environment';
import { Hobby } from './../models/hobbies.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  hobbiesSub: Subject<Hobby[]> = new Subject<Hobby[]>();
  hobbies: Hobby[] = [];

  constructor(private http: HttpClient) { }


  getAllHobbies(): void {
    const url = `${environment.url}/api/v1/hobbies/getAll`;
    this.http.get<{hobbies: any[], message: string}>(url)
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

  getHobbiesUpdatedList(): Observable<Hobby[]> {
    return this.hobbiesSub.asObservable();
  }


  addHobby(hobby: Hobby): void {
    const url = `${environment.url}/api/v1/hobbies/addHobby`;
    this.http.post<{hobbyId: any, message: string}>(url, hobby)
              .subscribe((res) => {
                hobby.id = res.hobbyId;
                this.hobbies.push(hobby);
                this.hobbiesSub.next([...this.hobbies]);
              });
  }
}
