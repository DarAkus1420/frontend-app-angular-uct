import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';
import { Brand } from '../modelos/brand';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

interface Config {
  success: Boolean;
  data: {
    [key: string]: Producto[];
  };
  messages: String;
  code: number;
}

interface ConfigBrands {
  success: Boolean;
  data: {
    [key: string]: Brand[];
  };
  messages: String;
  code: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private products: Producto[];
  //Este es un servidor mio donde hice deploy de la api en express, si quiere puede ejecutar la api en su maquina de forma
  //local
  private apiUrl = environment.API_URL; // URL to web api

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Config> {
    const url = `${this.apiUrl}/products`;
    const response = this.http.get<Config>(url);
    return response;
  }

  public addProduct(product: Producto): Observable<Producto> {
    const url = `${this.apiUrl}/product`;
    return this.http.post<Producto>(url, product, httpOptions);
  }

  public getBrands(): Observable<ConfigBrands> {
    const url = `${this.apiUrl}/brands`;
    return this.http.get<ConfigBrands>(url);
  }

  public addBrand(brand: Brand): Observable<Brand> {
    const url = `${this.apiUrl}/brand`;
    return this.http.post<Producto>(url, brand, httpOptions);
  }
}
