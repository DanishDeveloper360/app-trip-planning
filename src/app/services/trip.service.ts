import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Helper } from '../helpers/helper';
import { ITripService } from './itrip.service';
import { IRoute } from '../models/route.model.d';
export const TRIP_SERVICE_IMPL = new InjectionToken<ITripService>('tripServiceImpl');

@Injectable()
export class TripService implements ITripService {

    constructor(private http: HttpClient, private helper: Helper) { }

     /**
     * The following method is used to get response data from json
     * @param data
     */
    getTripDataFromJsonFile() {
        return this.http.get('assets/api/response.json');
    }

    /**
     * The following method is used to make a route or graph to find path
     * @param data
     */
    makeRouteMap(data: any): Map<string, Array<IRoute>> {
        const routes = new Map();

        data.forEach(deal => {
            const { departure, arrival, duration, transport, cost, discount } = deal;
            if (!routes.has(departure)) {
                routes.set(departure, []);
            }
            const destinations = routes.get(departure);
            destinations.push({
                departure,
                arrival,
                transport,
                minutes: this.helper.convertMinutesIntoDuration(duration.h, duration.m),
                time: `${duration.h}:${duration.m}`,
                price: this.helper.getPrice(cost, discount),
                discount: discount,
                originalPrice: cost
            });
            routes.set(departure, destinations);
        });

        return routes;
    }

    /**
     * The following method is used to get the total trip price
     * @param tripData
     */
    getTotalTripPrice(tripData: any): number {
        if (Object.entries(tripData).length > 0) {
            let totalTripPrice = 0;
            for (const [key, value] of Object.entries(tripData)) {
                totalTripPrice += value.price;
            }
            return totalTripPrice;
        }

        return 0;
    }

    /**
     * The following method is used to get the total trip time
     * @param tripData
     */
    getTotalTripTime(tripData: any): string {
        if (Object.entries(tripData).length > 0) {
            let totalMinutes = 0;
            for (const [key, value] of Object.entries(tripData)) {
                totalMinutes += value.minutes;
            }
            return this.helper.convertMinsToHrsMins(totalMinutes);
        }
    }

    /**
     * The following method is used to find cheapest or fastest path using Dijkstra's algorithm
     * @param departureCity
     * @param arrivalCity
     * @param routes
     * @param cities
     * @param tripType
     */
    findCheapestFastestPath(departureCity: any, arrivalCity: any, routes, cities, tripType): any {
        const enqueue = [];
        const cost = {};
        const direction = {};
        cities.forEach(city => {
            cost[city] = -1;
            enqueue.push(city);
        });
        cost[departureCity] = 0;

        while (enqueue.length) {
            // find the lowest cost city in the enqueue array
            const lowestCostCity = this.helper.getLowestPrice(enqueue, cost);
            if (lowestCostCity === arrivalCity) {
                break;
            }
            // removed lower cost city from enqueue array
            this.helper.removeItemInArray(enqueue, lowestCostCity);

            // update cost and direction object
            routes.get(lowestCostCity).forEach(route => {
                const newCost = cost[lowestCostCity] + route[tripType];
                if (cost[route.arrival] === -1 || newCost < cost[route.arrival]) {
                    cost[route.arrival] = newCost;
                    direction[route.arrival] = route;
                }
            });
        }

        return direction;
    }

}
