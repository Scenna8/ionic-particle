import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ParticleProvider } from '../../providers/particle/particle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public lux: any;
  private subscription: any = null;
  
  constructor(public navCtrl: NavController, public particle: ParticleProvider) {
  }

  ionViewDidLoad() {
    this.login()
  }

  cancelSubscription() {
    if (this.subscription) {
        this.subscription.cancel();
    }
    this.subscription = null;
  }

  ionViewDidEnter() {
    if (this.particle.device) {
        this.cancelSubscription();
        this.particle.pollVariable("lux").subscribe(
            (value) => { this.lux = value; },
            (error) => { console.log("Error reading lux"); },
            () => { console.log("Stopped polling lux"); }
        );
    }
  }
  getLux() {
    this.particle.getVariable("lux").then(
      (value)=>{
        this.lux=value;
      },
      (error)=>{

      }
    )
  }
  login() {
    this.navCtrl.push( LoginPage );
  }
}
