import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateRecipeComponent } from 'src/app/shared/components/add-update-recipe/add-update-recipe.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  constructor() {}

  ngOnInit() {}

  addUpdateProduct() {
    this.utilSvc.presentModal({
      component: AddUpdateRecipeComponent,
    });
  }
}
