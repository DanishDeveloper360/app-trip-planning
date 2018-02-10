import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ISearch } from '../models/search.model';

@Component({
  selector: 'search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./trip-sorter.css']
})
export class SearchTripComponent implements OnInit {

  @Input() cities: Array<string>;
  isError: boolean = false;
  errorMessage: string = '';

  trip: ISearch = {
    arrival: '',
    departure: '',
    transport: '',
    sortType: 'Cheapest',
    tripType: 'price'
  };

  @Output() searchTripEvent: EventEmitter<ISearch> = new EventEmitter();

  ngOnInit() {
  }

  /**
 * The following method is used to find the cheapest or fastest path and also make an array of trip
 */
  searchTrip() {

    // if departure and arrival fields are empty, then display error
    if (!this.trip.arrival || !this.trip.departure) {
      this.isError = true;
      this.errorMessage = 'Please enter departure and arrival city';
    }
    // if departure and arrival city name are same, the display error
    else if (this.trip.arrival === this.trip.departure) {
      this.isError = true;
      this.errorMessage = 'Departure and arrival city cannot be the same';
    }
    // if departure or arrival city name is not exist in the city list, the display error
    else if (this.cities.indexOf(this.trip.departure) === -1 || this.cities.indexOf(this.trip.arrival) === -1) {
      this.isError = true;
      this.errorMessage = 'Departure and arrival city does not exist. Pease select city name in the given suggestion list';
    }
    else {

      this.isError = false;
      this.errorMessage = '';

      this.searchTripEvent.emit(this.trip);
    }
  }

  /**
   * The following method is used to set the trip filter selected from front end
   * @param event
   * @param tripTypeValue
   */
  tripSortType(event: any, tripTypeValue: string, sortText: string, ) {
    this.trip.tripType = tripTypeValue;
    this.trip.sortType = sortText;
  }

}
