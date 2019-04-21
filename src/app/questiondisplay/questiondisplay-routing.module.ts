import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestiondisplayComponent } from './questiondisplay.component';
import { QuestionlistComponent } from './questionlist/questionlist.component';

const routes: Routes = [
  {
    path: '', component: QuestiondisplayComponent,
    children: [{ path: '', component: QuestionlistComponent }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestiondisplayRoutingModule { }
