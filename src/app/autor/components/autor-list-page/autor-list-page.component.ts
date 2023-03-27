
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AutorService } from "../../services/autor.service";
import { AutorInterface } from "../../types/autor.interface";

@Component({
    selector: 'app-autor-list-page',
    templateUrl: './autor-list-page.component.html'
}) 
export class AutorListPageComponent {

    autores$: Observable<AutorInterface[]> = this.autorService.getAutores();

    constructor(private autorService: AutorService) {}

}  