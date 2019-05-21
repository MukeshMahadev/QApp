import { Component, OnInit,ViewChild,EventEmitter,Output,Inject,Input} from '@angular/core';
import {FormsModule,FormControl,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core'; 
import { MatAutocompleteModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { Question } from '../question';
import { QuestionService } from '../../shared/services/question.service';
import {MatDialogModule , MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DemoMaterialModule} from '../material-module';

//interface for modal dialog box
export interface DialogData {
  getQuestion:string;
}

//Dialog component
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@NgModule({
  declarations: [
    DialogOverviewExampleDialog
  ],
  imports: [
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,        
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        DemoMaterialModule,
        //DialogOverviewExampleDialog
        ],
  exports:[
    MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule, 
        MatDialogModule,
        DemoMaterialModule,
        //DialogOverviewExampleDialog         
  ],
  bootstrap: [DialogOverviewExampleDialog]
      })


//component for Search Auto complete and Post Question button
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnInit {

  //animal: string;
  //name: string;
  randomNumberBetween0To1000 = Math.floor(Math.random() * 1000);
  myControl = new FormControl();
  questions: Question[];
  newquestions: Question[];
  searchedquestion:Question[];
  options: string[];
  getQuestion:string = "";
  SearchedQuestionId : string = "sid";
  newQuestion:Question[];
  //@Output() messageEvent = new EventEmitter<string>();
  closeResult: string;
  

  constructor(private questionservice :QuestionService,public dialog: MatDialog ) { }

  //TO generate random number for QuestionId
   generateRandNumber() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 3; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  ngOnInit() {
    this.questionservice.getQuestions().subscribe(q => this.questions = q);
  }

  //In sreach box OnSelect event 
  onSelectionChanged(id:string) {
    this.searchedquestion = Object(this.questions.find(x=>x._id===id));
    alert(JSON.stringify(this.searchedquestion));
    this.questionservice.searchquestion(this.searchedquestion);
    console.log(id);
  }


  /*postQuestion(question:string)
  {
    alert(this.getQuestion);
    console.log(this.getQuestion);
    this.questionservice.postQuestion(this.newQuestion);
    alert("sent")      
  }*/
  
  //get typed question on dialog popup
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {getQuestion:this.getQuestion}
    });

  //get typed question after closing the dialog popup
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getQuestion = result;
      alert(this.getQuestion);

     //Assign QuestionAndAnswer elements a new value
      this.newQuestion = [{
        _id : "",
        QuestionID:  this.randomNumberBetween0To1000 + this.generateRandNumber(),
        USerID : "User" + this.randomNumberBetween0To1000 + this.generateRandNumber(),
        Question:this.getQuestion,
        Answer : [],
        Upvote:"0",
        Downvote:"0",
      __v:0
      }];
      alert(JSON.stringify(this.newQuestion));

      //to update view with new question
      this.questionservice.pushNewQuestion(this.newQuestion,this.questions);

      //Post new Question by post request
      this.questionservice.postQuestion(this.newQuestion).subscribe((response)=>{
        this.questions.concat(response);
        console.log('response from post data is ', response);
        console.log('New Question added to Array ', this.questions);
      });
      alert("Question Sent to Server")
    });
  }
}