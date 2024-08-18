import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateRecipeComponent } from 'src/app/shared/components/add-update-recipe/add-update-recipe.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService)


  ngOnInit() {

  }
  addUpdateProduct() {
    this.utilSvc.presentModal({
      component: AddUpdateRecipeComponent,
    });
  }

  //CERRAR SESIÓN
  signOut() {
    this.firebaseSvc.signOut();
  }



}
