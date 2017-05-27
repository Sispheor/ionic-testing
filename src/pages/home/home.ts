import { SettingsPage } from './../Settings/settings.component';
import { Settings } from './../../models/Settings';
import { Component } from '@angular/core';
import { ModalController, NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  orders: String[];
  settings: Settings;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController) {

    this.orders = ["order 1", "order 2"];


    // get the settings object from the storage
    storage.get('settings').then((val) => {
      this.settings = val;

      if (this.settings == null){
        // we need to ask the URL to the user
        this.presentModalSettings()
      }
    });

  }

  presentModalSettings() {
    /**
     * Show the settings modal
     */
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }


}
