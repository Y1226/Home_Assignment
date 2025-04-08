import { Component } from '@angular/core';
import { SuppliersService } from '../../../Services/Suppliers/suppliers.service';
import { OrdersService } from '../../../Services/Orders/orders.service';
import { Orders } from '../../../Classes/Orders';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {

  orders: any
  currentSupplier:any

  constructor(private orderService: OrdersService, private supplierService: SuppliersService) {
    this.currentSupplier = this.supplierService.getStoredSupplier().company // get current supplier
    this.orderService.getOrdersBySupplier(this.currentSupplier).subscribe(x => {
      this.orderService.storeOrders(x)
      this.orders = this.orderService.getStoredOrders()
    })
  }


}
