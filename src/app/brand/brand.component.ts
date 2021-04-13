import { Component, OnInit, Inject } from '@angular/core';
import { Brand } from '../modelos/brand';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[];
  selectedBrand: Brand = new Brand();

  //Aqui Inyecte al padre para poder actualizar el select
  constructor(
    private apiService: ApiService,
    @Inject(AppComponent) private parent: AppComponent
  ) {}

  getBrands(): void {
    this.apiService.getBrands().subscribe((response) => {
      this.brands = response.data.brands;
      this.parent.brands = this.brands;
    });
  }

  addBrand(): void {
    this.apiService.addBrand(this.selectedBrand).subscribe((response) => {
      this.getBrands();
    });
  }
  delete(id: Number) {
    // console.log('hoal');
    console.log(`Eliminando ${id}`);
  }

  ngOnInit(): void {
    this.getBrands();
  }
}
