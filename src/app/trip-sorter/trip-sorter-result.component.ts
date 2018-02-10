import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IRoute } from '../models/route.model.d';
import { ISearch } from '../models/search.model';
import { IResult } from '../models/result.model';

@Component({
  selector: 'trip-sorter-result',
  templateUrl: './trip-sorter-result.component.html',
  styleUrls: ['./trip-sorter.css'],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripSorterResultComponent implements OnInit {

  @Input() tripData: IRoute[] = [];
  @Input() detail: any = {
    departure: '',
    arrival: '',
    sortType: '',
    totalTripTime: '',
    totalTripPrice: '',
    currency: ''
  };

  constructor() { }

  ngOnInit() { }

}
