import { Component, ViewChild } from '@angular/core';

import {HomePage} from '../pages/home/home';
import {Login} from "../pages/login/login";

import {Nav, Platform} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {ListPage} from "../pages/list/list.page";
import {MySettingsPage} from "../pages/my-settings/my-settings";

@Component({
  templateUrl: 'app.component.html'
})
export class AppComponent {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = Login;
    pages: Array<{ title: string, component: any }>;
  user: any;

  /*public appPages = [
    {
        title: 'Login',
        url: '/login',
        icon: 'list'
    },
      {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'MySettings',
      url: '/my-settings',
      icon: 'list'
    }
  ];*/

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService
  ) {
    this.initializeApp();

    this.pages = [
        {title: 'Home', component: HomePage},
        {title: 'List', component: ListPage},
        {title: 'MySettings', component: MySettingsPage},
    ]
  }

  initializeApp() {
    this.auth.user().then(user =>{
      this.user = user;
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

  logout(){
    this.auth.logout().then(()=> {
      this.nav.setRoot('Login');
    }).catch(()=>{
      this.nav.setRoot('Login');
    })
  }

  goToMySettings(){
    this.nav.setRoot('MySettingsPage')
  }


}
