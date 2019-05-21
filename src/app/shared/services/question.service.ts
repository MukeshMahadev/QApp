import {HttpClient, HttpResponse} from  '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QUESTIONS } from '../../questiondisplay/mock-questions';
import { Question } from '../../questiondisplay/question';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  newquestions:Question[];

  //to share data b/w component and update
  //here used for new question update
  private newQuestion = new BehaviorSubject<Question[]>(this.newquestions);
  currentquestion = this.newQuestion.asObservable();

  //for searching question
  private SearchnewQuestion = new BehaviorSubject<Question[]>(this.SearchnewQuestion);
  searchQuestion = this.SearchnewQuestion.asObservable();

  questions:Question[];
  configUrl: string = "api/questions/";
  constructor(private http:HttpClient) {    
   }

  getQuestions(){
    return this.http.get<Question[]>(this.configUrl);
  }

  getQuestionById()
  {

  }

  postQuestion(questions){
    console.log(questions)
    return this.http.post<Question[]>(this.configUrl,questions);
    console.log("Hitted");
  }

  //for new question update
  pushNewQuestion(newqts,oldqts){
    console.log("before question post",oldqts);
      this.newQuestion.next(oldqts.concat(newqts));
      console.log("from post",newqts);
      console.log("total question post",this.newQuestion);

  }

  //search new question
  searchquestion(searchedQts)
  {
    this.SearchnewQuestion.next(Array<Question>(Object(searchedQts)));
    console.log("Searched question",searchedQts);
  }
}
