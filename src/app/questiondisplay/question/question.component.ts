import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { Question } from '../question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  // question: Question;
  question: Question;
  constructor(private route: ActivatedRoute,
    private router: Router) {
      this.route.params.subscribe(params => {
        console.log(params);
        if (params['qid']) {
          this.question = params['qid'];
          console.log( this.question + 'Sucessfully Received in questiondisplay' );
        }
      });
    }

  ngOnInit() {
  }

}
