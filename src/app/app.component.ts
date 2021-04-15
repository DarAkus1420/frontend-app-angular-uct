import { Component, ViewChild } from '@angular/core';
import { Producto } from './modelos/producto';
import { Brand } from './modelos/brand';
import { ApiService } from './services/api.service';
import { BrandComponent } from './brand/brand.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(BrandComponent) brandComponent;
  listaProductos: Producto[];
  prodSeleccionado: Producto = new Producto();
  brands: Brand[];
  selectedBrand: Brand;

  constructor(private apiService: ApiService) {}

  getProducts(): void {
    this.apiService.getProducts().subscribe((response) => {
      this.listaProductos = response.data.products;
    });
  }

  getBrands(): void {
    this.apiService.getBrands().subscribe((response) => {
      this.brandComponent.brands = response.data.brands;
      //Seteado select por defecto
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

  insert() {
    this.apiService.addProduct(this.prodSeleccionado).subscribe((response) => {
      this.getProducts();
    });
  }

  delete(id: Number) {
    console.log(`Eliminando ${id}`);
    this.apiService.deleteProduct(id).subscribe((response) => {
      console.log(response);
      this.getProducts();
    });
  }
  ngOnInit() {
    this.getBrands();
    this.prodSeleccionado.brandId = -1;
    this.getProducts();
  }

  ngOnChanges() {
    this.brands = this.brandComponent.brands;
    console.log(this.brands, 'brands');
  }
}
