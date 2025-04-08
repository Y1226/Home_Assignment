import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  currentSupplier: any

  constructor(private router: Router) {}

  viewOrders() {
    this.router.navigate(['nav/'])
  }

  approveOrders() {
    this.router.navigate(['nav/approve'])
  }

  logout() {
    this.router.navigate(['../'])
  }
}
