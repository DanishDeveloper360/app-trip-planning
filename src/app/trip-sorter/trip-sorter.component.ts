import { Component, OnInit, Inject } from '@angular/core';
import { IRoute } from '../models/route.model.d';

import { Helper } from '../helpers/helper';
import { TripService, TRIP_SERVICE_IMPL } from '../services/trip.service';
import { ISearch } from '../models/search.model';
import { IResult } from '../models/result.model';

@Component({
  selector: 'app-trip-sorter',
  templateUrl: './trip-sorter.component.html',
  providers: [{ provide: TRIP_SERVICE_IMPL, useClass: TripService }],
  styleUrls: ['./trip-sorter.css']
})
export class TripSorterComponent implements OnInit {

  routes: Map<string, Array<IRoute>>;
  tripRoutes: Array<IRoute>;
  resultDetails: IResult = {
    departure: '',
    arrival: '',
    sortType: '',
    totalTripTime: '',
    totalTripPrice: '',
    currency: ''
  };
  cities: Array<string>;

  constructor(private tripService: TripService, private helper: Helper) {
    this.routes = new Map();
  }

  ngOnInit() {
    this.tripService.getTripDataFromJsonFile().subscribe((response: any) => {
      this.resultDetails.currency = response.currency;
      if (response.deals) {
        this.setCitiesData(response.deals);
        this.routes = this.tripService.makeRouteMap(response.deals);
      }
    });
  }

  /**
   * The following method is used to set cities data
   * @param citiesData
   */
  setCitiesData(citiesData: any): void {
    const cityHashMap = {};
    const cities = [];
    for (const i in citiesData) {
      if (citiesData[i]) {
        const city = citiesData[i];
        if (!cityHashMap[city.departure]) {
          cityHashMap[city.departure] = 1;
          cities.push(city.departure);
        }
        if (!cityHashMap[city.arrival]) {
          cityHashMap[city.arrival] = 1;
          cities.push(city.arrival);
        }

      }
    }

    this.cities = cities.sort();
  }

  /**
   * The following method is used to search desired trip
   */
  searchTrip(searchTripDetail: ISearch) {
    this.resultDetails.arrival = searchTripDetail.arrival;
    this.resultDetails.departure = searchTripDetail.departure;
    this.tripRoutes = [];
    const departureCity = searchTripDetail.departure;
    let origin = searchTripDetail.arrival;

    const direction = this.tripService.findCheapestFastestPath(searchTripDetail.departure,
      searchTripDetail.arrival, this.routes, this.cities, searchTripDetail.tripType);

    while (origin !== departureCity) {
      this.tripRoutes.unshift(direction[origin]);
      origin = direction[origin].departure;
    }

    this.resultDetails.totalTripPrice = this.tripService.getTotalTripPrice(this.tripRoutes).toString();
    this.resultDetails.totalTripTime = this.tripService.getTotalTripTime(this.tripRoutes);
  }

}
