import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { AddUpdateRecipeComponent } from './components/add-update-recipe/add-update-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from '../pages/main/home/home.page';



@NgModule({
  declarations: [
    HeaderComponent, LogoComponent, CustomInputComponent, AddUpdateRecipeComponent
  ],
  exports: [
    HeaderComponent, LogoComponent, CustomInputComponent, AddUpdateRecipeComponent
  ],
  imports: [
    CommonModule,
  IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
