import { HobbiesService } from './../services/hobbies.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HobbiesComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    HobbiesComponent,
    ListComponent
  ],
  providers: [HobbiesService]
})
export class HobbyModule { }
