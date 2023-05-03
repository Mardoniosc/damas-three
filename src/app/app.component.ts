import { Component } from '@angular/core';
import { extend } from 'angular-three';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

extend({ Mesh, BoxGeometry, MeshBasicMaterial });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'damas-three';
}
