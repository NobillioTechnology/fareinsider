import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
// import { AgmCoreModule } from '@agm/core';
// import {SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider,} from "angular-6-social-login";
// import { NgxSpinnerModule } from 'ngx-spinner';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ng6-toastr-notifications';
// import { ImageCropperModule } from 'ngx-image-cropper';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { AmazingTimePickerModule } from 'amazing-time-picker';

import { AppComponent } from './app.component';
import { BusDetailsComponent } from './component/bus-details/bus-details.component';
import { BusPaymentComponent } from './component/bus-payment/bus-payment.component';
import { BusResultComponent } from './component/bus-result/bus-result.component';
import { CustomerLoginComponent } from './component/customer-login/customer-login.component';
import { AgentLoginComponent } from './component/agent-login/agent-login.component';
import { FlightDetailsComponent } from './component/flight-details/flight-details.component';
import { FooterComponent } from './component/footer/footer.component';
import { RestDataService } from './rest-data.service';
import { HeroService } from './hero.service';
import { HeaderComponent } from './component/header/header.component';
import { HotelDetailsComponent } from './component/hotel-details/hotel-details.component';
import { HotelInformationComponent } from './component/hotel-information/hotel-information.component';
import { HotelPaymentComponent } from './component/hotel-payment/hotel-payment.component';
import { HotelResultComponent } from './component/hotel-result/hotel-result.component';
import { IndexComponent } from './component/index/index.component';
import { InternationalFlightComponent } from './component/international-flight/international-flight.component';
import { OnewayComponent } from './component/oneway/oneway.component';
import { PaymentComponent } from './component/payment/payment.component';
import { RoundwayComponent } from './component/roundway/roundway.component';
import { IpServiceService } from './ip-service.service';
import { ProfileComponent } from './component/profile/profile.component';
import { MyBookingComponent } from './component/my-booking/my-booking.component';
import { ChangePaswordComponent } from './component/change-pasword/change-pasword.component';
import { SuccessComponent } from './component/success/success.component';
import { ErrorComponent } from './component/error/error.component';


const APP_Routing: Routes =[
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'roundway', component: RoundwayComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'oneway', component: OnewayComponent },
  { path: 'international-flight', component: InternationalFlightComponent },
  { path: 'hotel-result', component: HotelResultComponent },
  { path: 'hotel-payment', component: HotelPaymentComponent },
  { path: 'hotel-information', component: HotelInformationComponent },
  { path: 'hotel-details', component: HotelDetailsComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'flight-details', component: FlightDetailsComponent },
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'agent-login', component:AgentLoginComponent },
  { path: 'bus-result', component: BusResultComponent },
  { path: 'bus-payment', component: BusPaymentComponent },
  { path: 'bus-details', component: BusDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-booking', component: MyBookingComponent },
  { path: 'change-pasword', component: ChangePaswordComponent },
  { path: 'success/:searchId', component: SuccessComponent },
  { path: 'error', component: ErrorComponent },
 
  ]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    RoundwayComponent,
    PaymentComponent,
    OnewayComponent,
    InternationalFlightComponent,
    HotelResultComponent,
    HotelPaymentComponent,
    HotelInformationComponent,
    HotelDetailsComponent,
    FooterComponent,
    FlightDetailsComponent,
    CustomerLoginComponent,
    AgentLoginComponent,
    BusResultComponent,
    BusPaymentComponent,
    BusDetailsComponent,
    ProfileComponent,
    MyBookingComponent,
    ChangePaswordComponent,
    SuccessComponent,
    ErrorComponent,
    
   

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_Routing),
    FormsModule,
    ReactiveFormsModule,
    // SocialLoginModule,
    // PdfViewerModule,
    // ToastrModule.forRoot(),
    // AgmCoreModule.forRoot({
    //                         apiKey: 'AIzaSyBr4_43KrcvdYY-BfwU4c1-Rtlw47nLGhI',
    //                         libraries: ["places"]
    //                     }),
    //                     NgxSpinnerModule,
    // BrowserAnimationsModule,
    // ImageCropperModule,
    // AmazingTimePickerModule 
    // ToastrModule.forRoot() 
    
  ],

  providers: [RestDataService,HeroService,IpServiceService
],
  bootstrap: [AppComponent]

})
export class AppModule { }
