import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule  } from '@angular/forms';



@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    //import here
    ReactiveFormsModule //import here
  ],
  exports: [
    CommentsComponent
  ]
})
export class CommentsModule { 
}
