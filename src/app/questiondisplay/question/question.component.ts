import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { QuestionService } from '../../shared/services/question.service';

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
  firstvoteflag: boolean;
  upvoteflag: boolean;
  pis: number;
  UpdatedAnswerAndQuestion: Question[];
  answerpostedflag: boolean;

  constructor(private questionservice: QuestionService,
    private route: ActivatedRoute,
    private router: Router, ) {
      this.route.params.subscribe(params => {
        // console.log(params);
        if (params['qid']) {
          this.questionstring = params['qid'] ;
          console.log('In QComp' + this.questionstring);
          this.obj = JSON.parse(this.questionstring);
          console.log( typeof(this.questionstring) + ' Sucessfully Received in questiondisplay ' + typeof(this.obj));

          //
        }
      });
    }
    // 102017274584;
  ngOnInit() {
    this.question_id = (this.obj._id);
    this.Answers = (this.obj.Answer ? this.obj.Answer : []);
    this.QuestionString = String(this.obj.Question);
    console.log(this.QuestionString);
    console.log(this.Answers);
    console.log('Upvotes ' + this.obj.Upvote + ' Type: ' + typeof(Number(this.obj.Upvote)));
    console.log('Downvotes ' + this.obj.Downvote + ' Type: ' + typeof(Number(this.obj.Downvote)));
    this.downvotes = (this.obj.Downvote) ? Number(this.obj.Downvote) : 0;
    this.upvotes = (this.obj.Upvote) ?  Number(this.obj.Upvote) : 0;
    this.firstvoteflag = false;
    this.upvoteflag = false;
    this.answerpostedflag = false;
    /*console.log(this.questionstring._id.);
    this.question_id = this.questionstring._id;
    this.questionID = this.questionstring.QuestionID.valueOf();
    this.QuestionString = this.questionstring.Question.valueOf();
    this.upvotes = Number(this.questionstring.Upvote.valueOf());
    this.downvotes = Number(this.questionstring.Downvote.valueOf());*/
  }
  upvote() {
    if (!this.firstvoteflag) {
      this.firstvoteflag = true;
      this.upvoteflag = true;
      this.upvotes += 1;
    } else if (!this.upvoteflag) {
      this.upvoteflag = true;
      this.upvotes += 1;
      this.downvotes -= 1;
    }
  }
  downvote() {
    if (!this.firstvoteflag) {
      this.firstvoteflag = true;
      this.upvoteflag = false;
      this.upvotes += 1;
    } else if (this.upvoteflag) {
      this.upvoteflag = false;
      this.upvotes -= 1;
      this.downvotes += 1;
    }
  }
  addAnswer(inputanswer: string) {
    if (this.answerpostedflag === true) {alert('You posted an answer just now!'); return; }
    if (inputanswer !== '' && inputanswer.length > 2 ) {
      this.answerpostedflag = true;
      this.Answers.unshift(inputanswer);
    // alert(this.question_id);
    this.UpdatedAnswerAndQuestion = [{
      _id : this.obj._id,
      QuestionID: this.obj.QuestionID,
      USerID : this.obj.USerID,
      Question: this.obj.Question,
      Answer : this.Answers,
      Upvote: String(this.upvotes),
      Downvote: String(this.downvotes),
    __v: 0
    }];

    // alert(JSON.stringify(this.UpdatedAnswerAndQuestion));

    // call service to update Answer
    this.questionservice.updateAnswer(this.UpdatedAnswerAndQuestion, this.obj._id).subscribe((response) => {    });
    // this.questionservice.updateAnswer("").subscribe((response)=>{    });
    // Call the service to update the entry
    // Prepare the question object
    alert('Answer Posted!');

    // this.questionservice.update();
    } else {
      alert('The minimum answer length is 2');
    }

  }
}
