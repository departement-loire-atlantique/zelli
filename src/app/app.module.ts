import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

import { ErrorInterceptor } from '@/app/Interceptors/error.interceptor';
import { JcmsBackendInterceptor } from '@/app/Interceptors/jcms-backend.interceptor';
import { MockBackendInterceptor } from '@/app/Interceptors/mock-backend.interceptor';
import { AppRoutingModule } from '@/app/app-routing.module';
import { AppComponent } from '@/app/app.component';
import { SharedModule } from '@/app/components/shared.module';

initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('combined-service-worker.js', {
      enabled: true,
      registrationStrategy: 'registerImmediately',
    }),
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JcmsBackendInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
