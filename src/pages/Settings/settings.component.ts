import { SettingsService } from './settings.service';
import { Settings } from './../../models/Settings';
import { Component } from '@angular/core';
import { LoadingController, ModalController, NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settings: Settings = new Settings();
  loader;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private storage: Storage,
    private SettingsService: SettingsService,
    public loadingCtrl: LoadingController) {

    // load settings from storage
    // get the settings object from the storage
    storage.get('settings').then((val) => {
      if (val != null) {
        this.settings = val;
        console.log("settings loaded from storage: " + this.settings);
      }

    });

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  testConnection() {
    console.log("Testing connection with URL: " + this.settings.url)

    this.loader.present();
    // hard coded settings for testing
    let testing_settings = new Settings();
    testing_settings.username = "admin";
    testing_settings.password = "secret";
    testing_settings.url = "192.168.0.12:5000"
    this.SettingsService.getVersion(testing_settings)
    .subscribe(
        success => this.connectionSuccess(),
        error => console.log("error: " + error));

  }

  connectionSuccess(){
        console.log("Connection to Kalliope API server OK")
        this.loader.dismiss();
  }

}
