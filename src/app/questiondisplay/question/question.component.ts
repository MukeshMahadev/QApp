import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { Question } from '../question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionstring: any;
  obj: Question;
  question_id: string;
  questionID: string;
  Answers: string[];
  QuestionString: string;
  upvotes: number;
  downvotes: number;
  firstvoteflag:boolean;
  upvoteflag:boolean;
  pis:number;

  constructor(private route: ActivatedRoute,
    private router: Router) {
      this.route.params.subscribe(params => {
        // console.log(params);
        if (params['qid']) {
          this.questionstring = params['qid'] ;
          console.log("In QComp"+this.questionstring);
          this.obj = JSON.parse(this.questionstring);
          console.log( typeof(this.questionstring) + ' Sucessfully Received in questiondisplay ' + typeof(this.obj));

        }
      });
    }
    // 102017274584;
  ngOnInit() {
    this.Answers = (this.obj.Answer?this.obj.Answer:[]);
    this.QuestionString = String(this.obj.Question);
    console.log(this.QuestionString);
    console.log(this.Answers);
    this.downvotes = ((this.obj.Downvote) === '') ? 0 : Number(this.obj.Upvote);
    this.upvotes = ((this.obj.Upvote) === '') ? 0 : Number(this.obj.Downvote);
    this.firstvoteflag=false;
    /*console.log(this.questionstring._id.);
    this.question_id = this.questionstring._id;
    this.questionID = this.questionstring.QuestionID.valueOf();
    this.QuestionString = this.questionstring.Question.valueOf();
    this.upvotes = Number(this.questionstring.Upvote.valueOf());
    this.downvotes = Number(this.questionstring.Downvote.valueOf());*/
  }
  upvote() {
    if(!this.firstvoteflag){
      this.firstvoteflag=true;
      this.upvoteflag=true;
      this.upvotes+=1;
    }
    else if(!this.upvoteflag){
      this.upvoteflag =true;
      this.upvotes += 1;
      this.downvotes -= 1;
    }
  }
  downvote() {
    if(!this.firstvoteflag){
      this.firstvoteflag = true;
      this.upvoteflag = false;
      this.upvotes += 1;
    } else if(this.upvoteflag) {
      this.upvoteflag = false;
      this.upvotes -= 1;
      this.downvotes += 1;
    }
  }
  addAnswer(inputanswer: string) {
    this.Answers.unshift(inputanswer);
    // Call the service to update the entry
  }
}
