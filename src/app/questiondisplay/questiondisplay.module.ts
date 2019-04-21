import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestiondisplayRoutingModule } from './questiondisplay-routing.module';
import { QuestiondisplayComponent } from './questiondisplay.component';
import { QuestionlistComponent } from './questionlist/questionlist.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [QuestiondisplayComponent, QuestionlistComponent, QuestionComponent],
  imports: [
    CommonModule,
    QuestiondisplayRoutingModule
  ]
})
export class QuestiondisplayModule { }
