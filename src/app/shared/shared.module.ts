import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from '../pages/main/home/home.page';
import { AddUpdateRecipeComponent } from './components/add-update-recipe/add-update-recipe.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    CustomInputComponent,
    AddUpdateRecipeComponent,
    UpdateUserComponent,
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    CustomInputComponent,
    AddUpdateRecipeComponent,
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
