import { Component, OnInit } from '@angular/core';
import { QUESTIONS } from '../mock-questions';  //purpose of testing 
import { QuestionService } from '../../shared/services/question.service'; 
import { Question } from '../question';


@Component({
  selector: 'app-questionlist',
  templateUrl: './questionlist.component.html',
  styleUrls: ['./questionlist.component.scss']
})
export class QuestionlistComponent implements OnInit {
  questions: Question[];
  constructor(private questionservice :QuestionService) { 
    
  }

  ngOnInit() {
    this.questionservice.getQuestions().subscribe(q => this.questions = q);
    console.log(this.questions[1]);
  }

}
