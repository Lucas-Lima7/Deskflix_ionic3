import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { RouteReuseStrategy } from 'angular/router';

import { IonicModule } from 'ionic-angular';
//import { IonicRouteStrategy } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {AppComponent} from "./app.component";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";
import {Login} from "../pages/login/login";


//import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule, Storage} from "@ionic/storage";

import {JwtClientService} from "../services/jwt-client.service";
import {AuthService} from "../services/auth.service";

import {JwtModule, JwtHelperService} from "@auth0/angular-jwt";
import {IonicApp} from "ionic-angular";
import { UserResource } from '../providers/resource/user-resource';
import {MySettingsPage} from "../pages/my-settings/my-settings";

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent,
      HomePage,
      ListPage,
      Login,
      MySettingsPage,
  ],
  imports: [
      HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(AppComponent, {}, {
          links: [
              {component: Login, name: 'LoginPage', segment: 'login'},
              {component: HomePage, name: 'HomePage', segment: 'home'},
              {component: MySettingsPage, name: 'MySettingsPage', segment: 'my-settings'},
              {component: ListPage, name: 'ListPage', segment: 'list'},
          ]
      }),
    //AppRoutingModule,

      IonicStorageModule.forRoot({
          driverOrder: ['localstorage']
      }),
      JwtModule.forRoot({
          /*jwtOptionsProvider: {
              provide: JWT_OPTIONS,
              useFactory: jwtOptionsFactory,
              deps: [AuthService]
          },*/
          config:{
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:8000'],
          }
      })
  ],
    bootstrap: [IonicApp, AppComponent],
    entryComponents: [
        AppComponent,
        HomePage,
        ListPage,
        Login,
        MySettingsPage,
    ],
  providers: [
    StatusBar,
    SplashScreen,
      JwtClientService,
      JwtHelperService,
      AuthService,
    UserResource,
   // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    /*  {
          provide: AuthHttp,
          deps: [HttpClientModule, Storage],
          useFactory(http, storage){
              let authConfig = new AuthConfig({
                  headerPrefix: 'Bearer',
                  noJwtError: true,
                  noClientCheck: true,
                  tokenGetter: (() => storage.get(ENV.TOKEN_NAME))
              });
              return new AuthHttp(authConfig, http)
          }
      }*/
  ]

})
export class AppModule {}

/*export function jwtOptionsFactory(AuthService) {
    return {
        tokenGetter: () => {
            return AuthService.getToken();
        },
    }
}*/
