import { Component } from '@angular/core';
import { OrdersService } from '../../../Services/Orders/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approve',
  imports: [CommonModule],
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss', '../view/view.component.scss']
})
export class ApproveComponent {
 
  orders:any

  constructor(private orderService: OrdersService) {
    this.orders = this.orderService.getStoredOrders()
  }

  approve(id:string) {
    // console.log(id);
    this.orderService.updateOrderStatus(id, 'processing').subscribe(x => x)    
  }
}
