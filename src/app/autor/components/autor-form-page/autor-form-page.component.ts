import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutorService } from '../../services/autor.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-autor-form-page',
  templateUrl: './autor-form-page.component.html',
})
export class AutorFormPageComponent implements OnInit, OnDestroy {

  autorForm!: FormGroup

  createMode: boolean = false;
  editMode: boolean = false;
  subscriptions = new Subscription();
  id!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private autorService: AutorService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.autorService.getAutor(this.id).subscribe((autor) => {
          this.autorForm = this.formBuilder.group({
            nome: autor.nome,
            genero: autor.genero,
            dataNascimento: autor.dataNascimento,
            biografia: autor.biografia
          })
        })
      }
    }

    this.autorForm = this.formBuilder.group({
      nome: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.validaNomeAutorTeste(),
        ]
      ],
      genero: 'F',
      dataNascimento: '1970-01-01',
      biografia: ['Biografia qualquer', Validators.required]
    })
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe();
  }

  save(): void {
    console.log(this.autorForm.value);

    if (this.createMode) {
      this.subscriptions.add(
        this.autorService.save(this.autorForm.value).subscribe(
          () => {
            this.router.navigate(['./autores'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do autor',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.autorService.update({
        ...this.autorForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          // TODO mensagem de sucesso
          this.router.navigate(['./autores'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do autor',
            buttons: ['Ok']
          })
          alerta.present()

        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./autores'])
  }


  validaNomeAutorTeste(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      return value.includes('teste') || value.includes('xyz') ? { invalidName: true } : null;
    };
  }
}