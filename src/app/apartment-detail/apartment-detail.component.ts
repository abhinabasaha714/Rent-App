import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../apartment.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../services/comments.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apartment-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './apartment-detail.component.html',
  styleUrl: './apartment-detail.component.scss'
})
export class ApartmentDetailComponent implements OnInit {
  apartment: any;
  comments: string[] = [];
  newComment: string = '';

  constructor(private route: ActivatedRoute, private apartmentService: ApartmentService, private commentService: CommentsService) {    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apartmentService.getApartmentById(Number(id)).subscribe(data => this.apartment = data);
    this.comments = this.commentService.getComments(Number(id))
  }

  public addComment() {
    if (this.newComment.trim()) {
      this.commentService.addComment(this.apartment.id, this.newComment);
      this.comments.push(this.newComment);
      this.newComment = '';
    }
  }

}
