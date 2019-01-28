import { HobbiesService } from './../services/hobbies.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// https://github.com/angular/angular/issues/25784#issuecomment-417919896
// https://angular.io/guide/providers#providedin-and-ngmodules
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
export class HobbyModule {}
