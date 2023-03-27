import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivroListaComponent } from './components/lista/livro-lista.component';
import { LivroCadastroComponent } from './components/cadastro/livro-cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivroService } from './services/livro.service';
import { LivroRoutingModule } from './livro-routing.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, LivroRoutingModule],
  declarations: [LivroListaComponent, LivroCadastroComponent],
  providers: [LivroService]
})
export class LivroModule {}
