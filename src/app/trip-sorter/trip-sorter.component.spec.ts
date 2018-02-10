import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { TripSorterComponent } from './trip-sorter.component';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule, TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TripService } from '../services/trip.service';
// import { HttpClient } from '@angular/common/http/src/client';
import { MockBackend } from '@angular/http/testing';
import { Helper } from '../helpers/helper';

describe('TripSorterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TypeaheadModule, TooltipModule],
      providers: [TripService,  {provide: HttpClient, deps: [MockBackend]}, HttpClientModule, Helper],
      declarations: [
        TripSorterComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));
  it('should create the TripSorterComponent', async(() => {
    const fixture = TestBed.createComponent(TripSorterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
 });



