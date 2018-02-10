export interface ITripService {

    /**
     * The following method is used to get trips data from JSON File
     */
    getTripDataFromJsonFile();

    /**
    * The following method is used to make a route or graph to find path
    * @param data
    */
    makeRouteMap(data: any);

    /**
     * The following method is used to get the total trip price
     * @param tripData
     */
    getTotalTripPrice(tripData: any);

    /**
     * The following method is used to get the total trip time
     * @param tripData
     */
    getTotalTripTime(tripData: any);

    /**
     * The following method is used to find cheapest or fastest path using Dijkstra's algorithm
     * @param departureCity
     * @param arrivalCity
     */
    findCheapestFastestPath(departureCity: any, arrivalCity: any, routes, cities, tripType);

}
