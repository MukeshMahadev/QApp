import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { QUESTIONS } from '../mock-questions';  // purpose of testing
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../shared/services/question.service';
import { Question } from '../question';


@Component({
  selector: 'app-questionlist',
  templateUrl: './questionlist.component.html',
  styleUrls: ['./questionlist.component.scss']
})
export class QuestionlistComponent implements OnInit {
  questions: Question[];
  SearchedQuestionId = 'sid';
  qtid: string ;
  myArray = [{'a': 1}, {'b': 2}, {'c': 3}];

  constructor(private questionservice: QuestionService,
    private route: ActivatedRoute,
    private router: Router) {


  }

  ngOnInit() {
    this.questionservice.getQuestions().subscribe(q => this.questions = q);
    console.log(this.myArray);
  }

   onclick() {
    console.log('recieved from search ' + localStorage.getItem(this.SearchedQuestionId));
    alert(this.qtid);
  }

  receiveMessage ($event) {
    console.log('recieved from search ' + $event);
    // this.questions = id;
  }
  questionDisplay(ob: Question) {
    console.log ('ID returned from html : ' );
    // Next : Pass it to Question-display component
    // this.router.navigate(['not-found']);
    console.log(ob);
    this.router.navigate(['questiondisplay', {qid: JSON.stringify(ob)}]);
    // this.router.navigate(['charts']);
  }
}
