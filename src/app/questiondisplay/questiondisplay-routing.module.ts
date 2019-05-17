import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestiondisplayComponent } from './questiondisplay.component';
import { QuestionlistComponent } from './questionlist/questionlist.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  {
    path: '', component: QuestiondisplayComponent,

    children: [
      { path: '', component: QuestionlistComponent },

    ]
  },
  {path: 'questiondisplay', component: QuestionComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestiondisplayRoutingModule { }
