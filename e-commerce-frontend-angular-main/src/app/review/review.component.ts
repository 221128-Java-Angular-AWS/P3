import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  review?: number;
  constructor() { }

  ngOnInit(): void {
  }

  assignReview(n: number): void {
    this.review = n;
  }

}
