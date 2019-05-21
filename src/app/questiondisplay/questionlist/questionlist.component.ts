import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { QUESTIONS } from '../mock-questions';  //purpose of testing 
import { QuestionService } from '../../shared/services/question.service'; 
import { Question } from '../question';
import { Router, ActivatedRoute } from '@angular/router';
import {FormsModule,FormControl,ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-questionlist',
  templateUrl: './questionlist.component.html',
  styleUrls: ['./questionlist.component.scss']
})
export class QuestionlistComponent implements OnInit {
  questions: Question[];
  newQuestion:Question[];
  questionControl = new FormControl();
  getUpVote : number = 0;
  downVote : number = 0;
  updateQuestion : Question[];
  qtid:string ;   

  constructor(private questionservice :QuestionService,
    private route: ActivatedRoute,
    private router: Router) { 
    
  }

  ngOnInit() {
    this.questionservice.getQuestions().subscribe(q => this.questions = q);
    //this.questionservice.currentUser.subscribe(q => this.questions = q)

    //to get posted new question
    this.getNewQuestion();

    //to get searched question
    this.getSearchedQuestion();

  }
  //to get searched question
  getSearchedQuestion() {
    this.questionservice.searchQuestion.subscribe((q)=> {
      this.questions = q;
    })
  }

  // to get posted new question
  getNewQuestion() {
    this.questionservice.currentquestion.subscribe((q) => {this.questions = q;
    });
    // this.questions = this.questions.concat(this.newQuestion);
    // this.questionservice.getQuestions().subscribe(q => this.questions = q);
    /*console.log("from ngOninit ",this.newQuestion);
    if(this.newQuestion!=null)
    {
    this.questions.push({
    _id:this.newQuestion["_id"],
    QuestionID: this.newQuestion["QuestionID"],
    USerID : this.newQuestion["USerID"],
    Question:this.newQuestion["Question"],
    Answer : this.newQuestion["Answer"],
    Upvote:this.newQuestion["Upvote"],
    Downvote:this.newQuestion["Downvote"],
    __v:0
    });
    console.log(this.newQuestion);
  }*/
  }

   onclick() {
  }

  receiveMessage ($event) {
    console.log('recieved from search ' + $event);
    // this.questions = id;
  }

  // increment Upvote
  increment(val, id) {
    this.questions.forEach((element, index) => {
      if (element._id === id) {
        element.Upvote = String(Number(Number(val) + 1));
      }
  });
  }

  // decrement for DownVote
  decement(val, id) {
    this.questions.forEach((element, index) => {
      if (element._id === id) {
        element.Downvote = String(Number(Number(val) - 1));
      }
  });
  }
  questionDisplay(ob: Question) {
    console.log ('ID returned from html : ' );
    // Next : Pass it to Question-display component
    // this.router.navigate(['not-found']);
    console.log(typeof(ob));
    this.router.navigate(['questiondisplay', {qid: JSON.stringify(ob) }]);
    // this.router.navigate(['charts']);
  }
}
