import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { CommentsModule } from '../../comments/comments/comments.module';



@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    CommentsModule
  ],
  exports: [
    PostsComponent
  ]
})
export class PostsModule { }
