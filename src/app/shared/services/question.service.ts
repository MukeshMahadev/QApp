import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QUESTIONS } from '../../questiondisplay/mock-questions';
import { Question } from '../../questiondisplay/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions:Question[];
  constructor() {
    this.questions = QUESTIONS;
   }

  getQuestions(): Observable<Question[]> {
    return of(this.questions); 
  }
}
