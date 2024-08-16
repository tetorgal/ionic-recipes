import { Injectable, inject } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AngularFireAuth)
  constructor() { }
}
