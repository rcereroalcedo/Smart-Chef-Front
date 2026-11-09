import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-no-encontrada',
  templateUrl: './no-encontrada.page.html',
  styleUrls: ['./no-encontrada.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NoEncontradaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
