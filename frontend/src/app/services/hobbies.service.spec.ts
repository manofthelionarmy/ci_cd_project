import { TestBed } from '@angular/core/testing';

import { HobbiesService } from './hobbies.service';

describe('HobbiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HobbiesService = TestBed.get(HobbiesService);
    expect(service).toBeTruthy();
  });
});
