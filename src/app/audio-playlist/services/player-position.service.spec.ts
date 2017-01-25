/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerPositionService } from './player-position.service';

describe('PlayerPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerPositionService]
    });
  });

  it('should ...', inject([PlayerPositionService], (service: PlayerPositionService) => {
    expect(service).toBeTruthy();
  }));
});
