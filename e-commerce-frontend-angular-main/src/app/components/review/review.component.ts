import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  review?: number;
  userInput: string = '';
  submitted: boolean = false;
  pending: boolean = true;
  output?: string;
  @Input() order?: Order;
  constructor() { }

  ngOnInit(): void {
  }

  assignReview(n: number): void {
    this.review = n;
  }
  setOrder(order?: Order): void {
    this.order =order;
  }

  onSubmit(): void {
    if (this.review) {
      this.submitted=true;
    }
  }
}
