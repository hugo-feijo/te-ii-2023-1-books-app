
import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { AutorService } from "../../services/autor.service";
import { AutorInterface } from "../../types/autor.interface";

@Component({
    selector: 'app-autor-list-page',
    templateUrl: './autor-list-page.component.html'
}) 
export class AutorListPageComponent {

    autores$: Observable<AutorInterface[]> = this.autorService.getAutores();

    constructor(private autorService: AutorService, private alertController: AlertController) {}

    async remove(autor: AutorInterface) {
      const alert = await this.alertController.create({
        header: 'Confirmação de exclusão',
        message: `Deseja realmente excluir ${autor.nome}?`,
        buttons: [
          {
            text: 'Sim',
            role: 'confirm',
            handler: () => {
              console.log(autor)
            },
          },
          {
            text: 'Não',
            role: 'cancel'
          }
        ]
      });
  
      await alert.present();
    }
}  