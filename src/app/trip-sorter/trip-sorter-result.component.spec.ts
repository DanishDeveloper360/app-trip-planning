import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule, TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TripService } from '../services/trip.service';
// import { HttpClient } from '@angular/common/http/src/client';
import { MockBackend } from '@angular/http/testing';
import { Helper } from '../helpers/helper';
import { TripSorterResultComponent } from './trip-sorter-result.component';
import { IRoute } from '../models/route.model';
import { IResult } from '../models/result.model';
import { ComponentFixture } from '@angular/core/testing';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

describe('TripSorterResultComponent', () => {

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TooltipModule.forRoot()],
      // providers: [TripService, { provide: HttpClient, deps: [MockBackend] }, HttpClientModule, Helper],
      declarations: [
        TestHostComponent, TripSorterResultComponent
      ],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create the trip-sorter-result Component', async(() => {
    const fixture = TestBed.createComponent(TripSorterResultComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should show the trip details with list of routes', () => {
    const count = testHostFixture.nativeElement.querySelectorAll('.trip-item').length;
    expect(count).toEqual(2);
  });

  it('should show the trip total Cost', () => {
    const cost = testHostFixture.nativeElement.querySelector('.totalTripPrice').innerHTML.trim();
    expect(cost).toEqual('90 Euro');
  });

  it('should show the trip total time duration of the trip', () => {
    const time = testHostFixture.nativeElement.querySelector('.totalTripTime').innerHTML.trim();
    expect(time).toEqual('3');
  });

  it('should show the departure and arrival destinations', () => {
    const departure = testHostFixture.nativeElement.querySelector('.departure').innerHTML.trim();
    const arrival = testHostFixture.nativeElement.querySelector('.arrival').innerHTML.trim();
    expect(departure + ' ' + arrival).toEqual('London Warsaw');
  });

});

@Component({
  selector: 'host-component',
  template: '<trip-sorter-result [tripData]="tripRoutes" [detail]="resultDetails" ></trip-sorter-result>'
})
class TestHostComponent {

  resultDetails: IResult = {
    departure: 'London',
    arrival: 'Warsaw',
    sortType: 'Cheapest',
    totalTripTime: '3',
    totalTripPrice: '90',
    currency: 'Euro'
  };
  tripRoutes: IRoute[] =
    [{
      departure: 'London',
      arrival: 'Amsterdam',
      transport: 'bus',
      minutes: 30,
      time: '2',
      price: 40,
      originalPrice: 40,
      discount: 0
    },
    {
      departure: 'Amsterdam',
      arrival: 'Warsaw',
      transport: 'bus',
      minutes: 20,
      time: '1',
      price: 50,
      originalPrice: 50,
      discount: 0
    }];
}

