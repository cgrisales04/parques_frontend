import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkComponent } from './park/park.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'park',
        component: ParkComponent
      },
      {
        path: '**',
        redirectTo: 'park'
      }
    ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
