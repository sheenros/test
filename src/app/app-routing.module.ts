import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DogComponent} from "./dog/dog.component";
import {RaceComponent} from "./race/race.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dog' },


  { path: 'dog', component: DogComponent },
  { path: 'race', component: RaceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
