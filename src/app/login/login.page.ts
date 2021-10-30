import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthErrorsService } from '../servicios/auth-errors.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mail = '';
  pass = '';
  loading: HTMLIonLoadingElement;
  constructor(private authSvc: AuthService,
     private router: Router,
      private loadingController: LoadingController,
     private authError: AuthErrorsService,
      private alertController: AlertController
      ) { }

  ngOnInit() {}

  async onLogin(email, password) {
   // const loading = await this.loadingController.create();
    await this.presentLoading();


    console.log('pass ', password.value);


    const user = await this.authSvc.login(email.value, password.value).then(
      (res) => {
        this.loading.dismiss();
       this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      async (err) => {
        this.loading.dismiss();

        const alert = await this.alertController.create({
          header: ':(',
          message: this.authError.getError(err.code),
          buttons: ['Aceptar'],
          cssClass: 'alertita'
        });

        await alert.present();
      }
    );
  }


  async loginGoogle(email, password) {
    try {
      const user = await this.authSvc.loginGoogle();

    } catch (error) {
      console.log('error ', error);

    }
  }

  redirecUser() {

    this.router.navigate(['home']);
  }
  onClick(selected: any) {

    console.log(selected);

    switch (selected) {
      case 'admin':

        this.mail = 'admin@admin.com';
        this.pass = '111111';

        break;
      case 'cliente':
        this.mail = 'cliente@invitado.com';
        this.pass = '222222';
        break;
    }
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: '<img src="../assets/img/spinner.svg" class="img-align"  />',
      translucent: true,
      spinner: null,
      //  cssClass: 'dio-5tpgiys2ol',
    });
    return this.loading.present();
  }
}

