import { Component, OnInit,ViewChild,EventEmitter,Output,Inject} from '@angular/core';
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

  animal: string;
  name: string;

  myControl = new FormControl();
  questions: Question[];
  options: string[];
  getQuestion:string = "";
  SearchedQuestionId : string = "sid";
  newQuestion:Question[];
  @Output() messageEvent = new EventEmitter<string>();
  closeResult: string;

  constructor(private questionservice :QuestionService,public dialog: MatDialog ) { }

  

  ngOnInit() {
    this.questionservice.getQuestions().subscribe(q => this.questions = q);
  }

  //In sreach box OnSelect event 
  onSelectionChanged(id:string) {
    this.messageEvent.emit(id);
    localStorage.setItem(this.SearchedQuestionId,id);
    alert(id);
    console.log(id);
  }


  postQuestion(question:string)
  {
    alert(this.getQuestion);
    console.log(this.getQuestion);
    this.questionservice.postQuestion(this.newQuestion);
    alert("sent")      
  }
  
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
        QuestionID: "Question1",
        USerID : "User1",
        Question:this.getQuestion,
        Answer : [],
        Upvote:"",
        Downvote:"",
      __v:0
      }];
      alert(JSON.stringify(this.newQuestion));

      //Post new Question by post request
      this.questions.concat(this.newQuestion);
      this.questionservice.postQuestion(this.newQuestion).subscribe((response)=>{
        console.log('response from post data is ', response);});
      alert("Question Sent to Server")
    });
  }
}