
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Observable, Subscription } from "rxjs";
import { AutorService } from "../../services/autor.service";
import { AutorInterface } from "../../types/autor.interface";

@Component({
    selector: 'app-autor-list-page',
    templateUrl: './autor-list-page.component.html'
}) 
export class AutorListPageComponent implements OnInit, OnDestroy {

    autores: AutorInterface[] = [];
    subscriptions = new Subscription();

    constructor(private autorService: AutorService, private alertController: AlertController) {}

    ngOnInit(): void {
      this.listAutor();
    }
    ngOnDestroy (): void {
      this.subscriptions.unsubscribe();
    }

    async remove(autor: AutorInterface) {
      const alert = await this.alertController.create({
        header: 'Confirmação de exclusão',
        message: `Deseja realmente excluir ${autor.nome}?`,
        buttons: [
          {
            text: 'Sim',
            role: 'confirm',
            handler: () => {
              this.subscriptions.add(
                this.autorService.remove(autor)
                .subscribe(() => this.listAutor())
              );
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

    listAutor() {
      this.subscriptions.add(
        this.autorService.getAutores()
        .subscribe((autoresReturn) => this.autores = autoresReturn)
      );
    }
}  