import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-recipe',
  templateUrl: './add-update-recipe.component.html',
  styleUrls: ['./add-update-recipe.component.scss'],
})
export class AddUpdateRecipeComponent implements OnInit {

  @Input() recipe: Recipe

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    ingredients: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    servings: new FormControl('', [Validators.required, Validators.min(1)]),
    time: new FormControl('', [Validators.required, Validators.min(0)]),
    steps: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.recipe) {
      console.log("Editing recipe:", this.recipe);
      this.form.patchValue(this.recipe);
    }
    console.log("Form value after init:", this.form.value);
  }

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Imagen del producto'))
      .dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  submit() {
    if(this.form.value){
      if(this.recipe) this.updateRecipe();
      else this.createRecipe();
    }

  }
  async createRecipe() {
    let path = `users/${this.user.uid}/recipes`;
    const loading = await this.utilsSvc.loading();
    await loading.present();
  
    try {
      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);
  
      const recipeData = this.form.value;
      delete recipeData.id;  // Remove id if it exists
  
      const docRef = await this.firebaseSvc.addDocument(path, recipeData);
      console.log("Document written with ID: ", docRef.id);
  
      // Update the form with the new ID
      this.form.patchValue({ id: docRef.id });
  
      this.utilsSvc.dismissModal({ success: true });
      this.utilsSvc.presentToast({
        message: 'Se ha creado con éxito',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    } finally {
      loading.dismiss();
    }
  }

  async updateRecipe() {
    let path = `users/${this.user.uid}/recipes/${this.recipe.id}`;
    const loading = await this.utilsSvc.loading();
    await loading.present();
  
    try {
      if (this.form.value.image !== this.recipe.image) {
        let dataUrl = this.form.value.image;
        let imagePath = await this.firebaseSvc.getFilePath(this.recipe.image);
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
        this.form.controls.image.setValue(imageUrl);
      }
  
      const updatedRecipe = { ...this.form.value };
      delete updatedRecipe.id;
  
      await this.firebaseSvc.updateDocument(path, updatedRecipe);
      this.utilsSvc.dismissModal({ success: true });
      this.utilsSvc.presentToast({
        message: 'Se ha actualizado con éxito',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });
    } catch (error) {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    } finally {
      loading.dismiss();
    }
  }
}