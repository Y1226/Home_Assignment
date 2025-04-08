import { Component } from '@angular/core';
import { SuppliersService } from '../../../Services/Suppliers/suppliers.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addmdse',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addmdse.component.html',
  styleUrls: ['./addmdse.component.scss', '../../app.component.scss']
})
export class AddmdseComponent {
  mdseForm: FormGroup
  mdse: any[] = []
  valid = true // check if all fields are filled in.

  constructor(private fb: FormBuilder, private supplierService: SuppliersService, private router: Router) {
    this.mdseForm = this.fb.group({
      pdct: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  Add() {
    if (this.mdseForm.valid) {
      this.mdse.push(this.mdseForm.value)
      this.mdseForm.reset('') // empty fields
      this.valid = true
    } 
    else {
      this.valid = false
    }
  }

  excel() {
    alert("Not yet set up.")
  }

  submit() {
    let supplier = this.supplierService.getStoredSupplier()
    supplier.mdse = this.mdse // update merchandise
    this.supplierService.addSupplier(supplier).subscribe(x => {
      this.supplierService.supplier = x
      this.router.navigate(['../']) // go to login page
    })
  }

}
