import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);

  modalCtrl = inject(ModalController);
  router = inject(Router);

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelPhoto: 'Selecciona una foto',
      promptLabelPicture: 'Toma una foto',
    });
  }

  //  Loading
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }




  //ENRUTA CUALQUIER PAG DISPONIBLE

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //GUARDAR ELEMENTO EN LOCALSTOREGE
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  //OBTENER ELEMENTO DESDE LOCALSTOREGE
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

  //Toast 
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  // Modal
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      return data;
    }
  }
  dismissModal(data?: any) {
    return this.modalCtrl.dismiss();
  }
  constructor() { }
}
