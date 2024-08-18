import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-details-modal',
  templateUrl: './recipe-details-modal.component.html',
  styleUrls: ['./recipe-details-modal.component.scss'],
})
export class RecipeDetailsModalComponent {
  @Input() recipe!: Recipe;

  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}