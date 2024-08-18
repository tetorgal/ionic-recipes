import { Component, inject, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateRecipeComponent } from 'src/app/shared/components/add-update-recipe/add-update-recipe.component';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.page.html',
  styleUrls: ['./my-recipes.page.scss'],
})
export class MyRecipesPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService)

  recipes: Recipe[] = []

  constructor() { }

  ngOnInit() {
  }

  addUpdateRecipe(recipe?: Recipe) {
    this.utilSvc.presentModal({
      component: AddUpdateRecipeComponent,
      cssClass: 'add-update-modal',
      componentProps: { recipe }
    });
  }

  user(): User {
    return this.utilSvc.getFromLocalStorage('user') || {};
  }
  ionViewWillEnter() {
    this.getRecipes()
  }



  getRecipes() {
    let path = `users/${this.user().uid}/recipes`;
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log("Fetched recipes:", res);
        this.recipes = res.map(doc => ({
          id: doc.id,
          ...doc
        }));
        sub.unsubscribe();
      }
    });
  }

  // Alerta para eliminar
  async confirmDeleteRecipe(recipe: Recipe) {
    this.utilSvc.presentAlert({
      header: 'Eliminar publicación',
      message: '¿Quieres elimnar esta publicación?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Sí. eliminar',
          handler: () => {
            this.deleteRecipe(recipe);
          }
        }
      ]
    });
  }


  // -- Eliminar publicación --

  async deleteRecipe(recipe: Recipe) {


    let path = `users/${this.user().uid}/recipes/${recipe.id}`

    const loading = await this.utilSvc.loading();
    await loading.present();

    let imagePath = await this.firebaseSvc.getFilePath(recipe.image);
    await this.firebaseSvc.deleteFile(imagePath);



    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.recipes = this.recipes.filter(r => r.id !== recipe.id);


      this.utilSvc.presentToast({
        message: 'Receta borrada con éxito',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })


    }).catch(error => {
      console.log(error);

      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

    }).finally(() => {
      loading.dismiss();
    })

  }

}
