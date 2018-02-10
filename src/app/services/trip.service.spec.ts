import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TripService } from '../services/trip.service';
// import { HttpClient } from '@angular/common/http/src/client';
import { MockBackend } from '@angular/http/testing';
import { Helper } from '../helpers/helper';
import { IRoute } from '../models/route.model';
import { IResult } from '../models/result.model';
import { HttpHandler } from '@angular/common/http/src/backend';
import { XHRBackend, ResponseOptions } from '@angular/http';
import { inject } from '@angular/core/testing';

describe('Service: TripService', () => {

  // let service: TripService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, deps: [MockBackend] }, HttpClientModule, Helper,
        TripService,
      { provide: XHRBackend, useClass: MockBackend }]
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));


  it('Should calculate total cost', () => {
    inject([TripService], (tripService) => {
      expect(tripService.getTotalTripPrice([{ price: 88 }, { price: 12 }])).toBe(100);
    });
  });

  it('Should calculate total time duration', () => {
    inject([TripService], (tripService) => {
      expect(tripService.getTotalTripTime([{ minutes: 20 }, { minutes: 25 }])).toBe(45);
    });
  });

  it('Should make a route or graph to find path', () => {
    inject([TripService], (tripService) => {
      expect(tripService.makeRouteMap(
        [{
          'transport': 'train', 'departure': 'London', 'arrival': 'Amsterdam',
          'duration': { 'h': '05', 'm': '00' }, 'cost': 160, 'discount': 0, 'reference': 'TLA0500'
        },
        {
          'transport': 'bus', 'departure': 'London', 'arrival': 'Amsterdam',
          'duration': { 'h': '07', 'm': '45' }, 'cost': 40, 'discount': 25, 'reference': 'BLA0745'
        },
        {
          'transport': 'car', 'departure': 'London', 'arrival': 'Amsterdam',
          'duration': { 'h': '04', 'm': '45' }, 'cost': 120, 'discount': 0, 'reference': 'CLA0445'
        },
        {
          'transport': 'train', 'departure': 'London', 'arrival': 'Paris',
          'duration': { 'h': '04', 'm': '30' }, 'cost': 160, 'discount': 0, 'reference': 'TLP0430'
        },
        {
          'transport': 'bus', 'departure': 'London', 'arrival': 'Paris',
          'duration': { 'h': '05', 'm': '30' }, 'cost': 40, 'discount': 50, 'reference': 'BLP0530'
        },
        {
          'transport': 'car', 'departure': 'London', 'arrival': 'Paris',
          'duration': { 'h': '04', 'm': '15' }, 'cost': 120, 'discount': 0, 'reference': 'CLP0415'
        },
        ]

      ).get('London')).toBe({
        'transport': 'car', 'departure': 'London', 'arrival': 'Paris',
        'duration': { 'h': '04', 'm': '15' }, 'cost': 120, 'discount': 0, 'reference': 'CLP0415'
      });
    });
  });
});
