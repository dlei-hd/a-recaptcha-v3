import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RecaptchaV3Module, AppRoutingModule],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LfGOfAUAAAAAEMlRUWZJ_16a7fSlc2YQpuwk_wD',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
