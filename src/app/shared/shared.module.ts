import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { AddUpdateRecipeComponent } from './components/add-update-recipe/add-update-recipe.component';



@NgModule({
  declarations: [
    HeaderComponent, LogoComponent, CustomInputComponent,AddUpdateRecipeComponent
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
