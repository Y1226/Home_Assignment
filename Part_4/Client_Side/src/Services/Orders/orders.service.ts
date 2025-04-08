import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../../Classes/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public httpclient: HttpClient) { }
  baseUrl: string = 'http://localhost:8520/orders/'

  orders: Array<Orders> = new Array<Orders>()

  storeOrders(orders: Array<Orders>) {
    this.orders = orders;
  }
  getStoredOrders(): Array<Orders> {
    return this.orders;
  }

  getOrdersBySupplier(sply: string): Observable<Array<Orders>> {
    return this.httpclient.get<Array<Orders>>(`${this.baseUrl}getOrdersBySupplier/${sply}`)
  }
  updateOrderStatus(id:string, st:string): Observable<Orders> {
    return this.httpclient.put<Orders>(`${this.baseUrl}updateOrderStatus/${id}/${st}`, {})
  }
}
