import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  storage = inject(AngularFireStorage);
  utilsSvc = inject(UtilsService);
  constructor() { }



  // BASE DE DATOS
  //Setear un documento
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }


  // Obtener un documento
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // Agregar un documento
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  //Almacenamiento

  //Subir imagen
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }
  //Auntentificación

  getAuth() {
    return getAuth();
  }

  //Acceder
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)

  }

  //Crear Usuario
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //Actualizar Uuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

  //ENVIAR EMAIL PARA RESTABLECER CONTRASEÑA

  sendRecoveryEmailemail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  //CERRAR SESION
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

}