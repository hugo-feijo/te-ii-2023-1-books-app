import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autor-form-page',
  templateUrl: './autor-form-page.component.html',
})
export class AutorFormPageComponent implements OnInit, OnDestroy {

  autorForm!: FormGroup

  createMode: boolean = false;
  editMode: boolean = false;
  subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private autorService: AutorService,
  ) { }

  ngOnInit(): void {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    this.autorForm = this.formBuilder.group({
      nome: 'Nome qualquer',
      genero: 'F',
      dataNascimento: '1970-01-01',
      biografia: 'Biografia qualquer'
    })
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe();
  }

  save(): void {
    console.log(this.autorForm.value);

    this.subscriptions.add(
      this.autorService.save(this.autorForm.value).subscribe(
        () => {
          // TODO mensagem de sucesso
          this.router.navigate(['./autores'])
        },
        () => {

        }
      )
    )
  }

  cancel(): void {
    this.router.navigate(['./autores'])
  }


}