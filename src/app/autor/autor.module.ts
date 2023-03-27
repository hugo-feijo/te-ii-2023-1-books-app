import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AutorRoutingModule } from "./autor-routing.module";
import { AutorListPageComponent } from "./components/autor-list-page/autor-list-page.component";
import { AutorService } from "./services/autor.service";

@NgModule({
    imports: [CommonModule, HttpClientModule, IonicModule, AutorRoutingModule],
    declarations: [AutorListPageComponent],
    providers: [AutorService]
})
export class AutorModule { }