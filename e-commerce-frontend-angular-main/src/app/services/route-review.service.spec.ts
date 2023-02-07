import { TestBed } from '@angular/core/testing';

import { RouteReviewService } from './route-review.service';

describe('RouteReviewService', () => {
  let service: RouteReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
