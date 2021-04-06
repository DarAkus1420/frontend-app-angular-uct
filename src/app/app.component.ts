import { Component } from '@angular/core';
import { Producto } from './modelos/producto';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  listaProductos: Producto[];
  prodSeleccionado: Producto = new Producto();

  constructor(private apiService: ApiService) {}

  getProducts(): void {
    this.apiService.getProducts().subscribe((response) => {
      this.listaProductos = response.data.products;
    });
  }

  //De momento estos medotos no haran nada, ya que aun no implemento el crud completo en angular

  // actualizar() {
  //   if (!this.prodSeleccionado.id && this.listaProductos.length != 0) {
  //     this.prodSeleccionado.id =
  //       this.listaProductos[this.listaProductos.length - 1].id + 1;
  //     this.listaProductos.push(this.prodSeleccionado);
  //   } else {
  //     this.prodSeleccionado.id = 0;
  //     this.listaProductos.push(this.prodSeleccionado);
  //   }
  //   this.prodSeleccionado = new Producto();
  // }

  // editar(prod: Producto) {
  //   this.prodSeleccionado = prod;
  // }

  // eliminar() {
  //   if (confirm('¿Realmente desea eliminar?')) {
  //     this.listaProductos = this.listaProductos.filter(
  //       (prod) => prod != this.prodSeleccionado
  //     );
  //     this.prodSeleccionado = new Producto();
  //   }
  // }

  actualizar() {
    this.apiService.addProduct(this.prodSeleccionado).subscribe((response) => {
      this.getProducts();
      console.log(response);
    });
  }

  editar(prod: Producto) {}
  eliminar() {}
  ngOnInit() {
    this.getProducts();
  }
}
