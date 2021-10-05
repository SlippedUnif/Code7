import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { CadastroFilmeComponent } from './cadastro-filme/cadastro-filme.component'
import { ReactiveFormsModule  } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table' 
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    CadastroFilmeComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule
  ],exports: [
    MatSelectModule,
  ]
})
export class ComponentsModule { }
