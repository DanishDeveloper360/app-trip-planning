import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TripSorterComponent } from './trip-sorter/trip-sorter.component';
import { TripSorterResultComponent } from './trip-sorter/trip-sorter-result.component';

import { TripService } from './services/trip.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { TypeaheadModule, TooltipModule } from 'ngx-bootstrap';
import { Helper } from './helpers/helper';
import { SearchTripComponent } from './trip-sorter/search-trip.component';

@NgModule({
    declarations: [
        AppComponent,
        TripSorterComponent,
        TripSorterResultComponent,
        SearchTripComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TypeaheadModule.forRoot(),
        TooltipModule.forRoot()
    ],
    providers: [
        TripService,
        Helper
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
