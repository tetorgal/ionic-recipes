import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateRecipeComponent } from 'src/app/shared/components/add-update-recipe/add-update-recipe.component';
import { RecipeDetailsModalComponent } from 'src/app/shared/components/recipe-details-modal/recipe-details-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  recipes: Recipe[] = []
  constructor() { }

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService)

  user(): User {
    return this.utilSvc.getFromLocalStorage('user') || {};
  }
  ngOnInit() {

    this.getRecipes()
  }
  addUpdateRecipe() {
    this.utilSvc.presentModal({
      component: AddUpdateRecipeComponent,
    });
  }

  async openRecipeDetails(recipe: Recipe) {
    const modal = await this.utilSvc.presentModal({
      component: RecipeDetailsModalComponent,
      componentProps: { recipe },
    });
  }
  getRecipes() {
    let path = `recipes`;
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log("Fetched recipes:", res);
        this.recipes = res

        sub.unsubscribe();
      }
    });
  }

  //CERRAR SESIÓN
  signOut() {
    this.firebaseSvc.signOut();
  }



}
