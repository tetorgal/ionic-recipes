import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { AddUpdateRecipeComponent } from './components/add-update-recipe/add-update-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from '../pages/main/home/home.page';
import { RecipeDetailsModalComponent } from './components/recipe-details-modal/recipe-details-modal.component';



@NgModule({
  declarations: [
    HeaderComponent, LogoComponent, CustomInputComponent, AddUpdateRecipeComponent, RecipeDetailsModalComponent
  ],
  exports: [
    HeaderComponent, LogoComponent, CustomInputComponent, AddUpdateRecipeComponent, RecipeDetailsModalComponent
  ],
  imports: [
    CommonModule,
  IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
