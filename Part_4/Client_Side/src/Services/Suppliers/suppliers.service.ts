import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../Classes/Suppliers';
import { Mdse } from '../../Classes/Mdse';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(public httpclient:HttpClient) { }
  baseUrl:string = 'http://localhost:8520/suppliers/'

  supplier: Supplier = new Supplier("", "", "", "", "", [])

  storeSupplier(supplier: Supplier) {
    this.supplier = supplier;  
  }
  getStoredSupplier(): Supplier {
    return this.supplier;
  }  

  getSupplierByCompanyAndPswd(cmpny:string, pswd:string): Observable<Supplier> {
    return this.httpclient.get<Supplier>(`${this.baseUrl}getSupplierByCompanyAndPswd/${cmpny}/${pswd}`)
  }
  addSupplier(sply: Supplier): Observable<Supplier> {
    return this.httpclient.post<Supplier>(`${this.baseUrl}addSupplier`, sply)
  } 
}
