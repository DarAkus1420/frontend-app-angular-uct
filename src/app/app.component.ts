import { Component } from '@angular/core';
import { Producto } from './modelos/producto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  listaProductos: Producto[] = [
    { id: 1, nombre: 'Notebook', stock: 45 },
    { id: 2, nombre: 'Tablet', stock: 12 },
    { id: 3, nombre: 'Disco Externo', stock: 20 },
    { id: 4, nombre: 'Impresora Laser', stock: 18 },
    { id: 5, nombre: 'Impresora 3D', stock: 2 },
  ];
  prodSeleccionado: Producto = new Producto();
  actualizar() {
    if (!this.prodSeleccionado.id && this.listaProductos.length != 0) {
      this.prodSeleccionado.id =
        this.listaProductos[this.listaProductos.length - 1].id + 1;
      this.listaProductos.push(this.prodSeleccionado);
    } else {
      this.prodSeleccionado.id = 0;
      this.listaProductos.push(this.prodSeleccionado);
    }
    this.prodSeleccionado = new Producto();
  }

  editar(prod: Producto) {
    this.prodSeleccionado = prod;
  }

  eliminar() {
    if (confirm('¿Realmente desea eliminar?')) {
      this.listaProductos = this.listaProductos.filter(
        (prod) => prod != this.prodSeleccionado
      );
      this.prodSeleccionado = new Producto();
    }
  }
}
