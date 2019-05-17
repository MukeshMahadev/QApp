import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestiondisplayRoutingModule } from './questiondisplay-routing.module';
import { QuestiondisplayComponent } from './questiondisplay.component';
import { QuestionlistComponent } from './questionlist/questionlist.component';
import { QuestionComponent } from './question/question.component';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  declarations: [QuestiondisplayComponent, QuestionlistComponent, QuestionComponent, SearchBoxComponent],
  imports: [
    CommonModule,
    QuestiondisplayRoutingModule,
    SearchBoxComponent
  ]
})
export class QuestiondisplayModule { }
