import {HttpClient, HttpResponse} from  '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QUESTIONS } from '../../questiondisplay/mock-questions';
import { Question } from '../../questiondisplay/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
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
    return this.http.post<Question[]>(this.configUrl,questions);
  }
}
