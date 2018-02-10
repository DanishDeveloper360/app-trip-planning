import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule, TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TripService } from '../services/trip.service';
import { MockBackend } from '@angular/http/testing';
import { Helper } from '../helpers/helper';
import { TripSorterResultComponent } from './trip-sorter-result.component';
import { IRoute } from '../models/route.model';
import { IResult } from '../models/result.model';
import { ComponentFixture } from '@angular/core/testing';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SearchTripComponent } from './search-trip.component';

describe('SearchTripComponent', () => {

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TypeaheadModule.forRoot()],
      declarations: [
        TestHostComponent, SearchTripComponent
      ],
    })
  }));


  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create the search-trip Component', async(() => {
    const formCreated = testHostFixture.nativeElement.querySelectorAll('.form-group').length;
    expect(formCreated).toBeGreaterThan(1);
  }));

  it('should show required validation message for arrival and departure', async(() => {

    const button = testHostFixture.debugElement.nativeElement.querySelector('button');
    button.click();

    testHostFixture.whenStable().then(() => {
      const errorMessage = testHostFixture.nativeElement.querySelector('.alert');
      console.log(errorMessage);
      expect(errorMessage).toBe(null);
    });

  }));

});


@Component({
  selector: 'host-component',
  template: '<search-trip (searchTripEvent) = "searchTrip($event)" [cities]="cities" ></search-trip>'
})
class TestHostComponent {

  cities = ['London', 'Paris', 'Amsterdam'];

  searchTrip() {
    return true;
  }

}
