import { Component, OnInit } from '@angular/core';
import {JwtClientService} from "../../services/jwt-client.service";
import {AuthService} from "../../services/auth.service";
import {IonicPage, MenuController, NavController, ToastController} from "ionic-angular";
import {HomePage} from "../home/home";
import {appContainer} from "../../app/app.container";
import {Auth} from "../../decorators/auth.decorator";
import {MySettingsPage} from "../my-settings/my-settings";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login{

    user = {
        email: 'admin@user.com',
        password: 'secret'
    };


    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public toastCtrl: ToastController,
        private auth: AuthService,
        //private  jwtClient: JwtClientService
    ) {
        console.log(appContainer().get(AuthService));
        this.menuCtrl.enable(false);
    }

    /*ionViewDidLoad(){
        console.log('ionViewDidLoad Login');
    }*/


    /*getToken():Promise<string>{
        return new Promise((resolve) => {
            if(this._token){
                resolve(this._token);
            }
            this.storage.get('token').then((token) => {
                this._token = token;
                resolve(this._token);
            });
        });
    }*/

    login() {
        this.auth.login(this.user)
            .subscribe(() => {
                this.afterLogin();
            }, (error) => {

                let toast = this.toastCtrl.create({
                    message: 'Email e/ou senha inválidos.',
                    duration: 3000,
                    position: 'top',
                    cssClass: 'toast-reverse'
                });
                toast.present();
            });

        //});
    /*this.jwtClient
        .accessToken({email: this.email, password:this.password})
        .then((token) =>{
            console.log(token);
        });*/
    }

    afterLogin() {
        this.menuCtrl.enable(true);
        this.navCtrl.push(MySettingsPage);
    }

    irParaHome(){
        this.navCtrl.push(HomePage);
    }
}
