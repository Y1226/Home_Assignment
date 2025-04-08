import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Supplier } from "../../../Classes/Suppliers";
import { SuppliersService } from "../../../Services/Suppliers/suppliers.service";
import { Router } from "@angular/router";
// import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../app.component.scss']
})
export class LoginComponent {
  signupForm: FormGroup
  loginForm: FormGroup;
  su_valid = true
  l_valid = 0

  constructor(private fb: FormBuilder, public suppliersService: SuppliersService, public router: Router) {

    this.signupForm = this.fb.group({
      company: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{8,9}$/)]],
      repName: ['', Validators.required],
      pswd: ['', Validators.required]
    })

    this.loginForm = this.fb.group({
      company: ['', Validators.required],
      pswd: ['', Validators.required]
    })
  }

  

  onSubmitSignup() {
    if (this.signupForm.valid) {
      let sply:Supplier = this.signupForm.value
      this.suppliersService.storeSupplier(sply) // Save supplier to update mdse.
      this.router.navigate(['/addMdse'])
    }
    else {
      // Check if invalid phone or empty fields.
      if (this.signupForm.get('phone')?.errors?.['pattern'])
        this.su_valid = true
      else 
        this.su_valid = false
    }
  }

  l_formValue() {
    return this.loginForm.value
  }

  onSubmitLogin() {
    let cmpny = this.l_formValue().company
    let pswd = this.l_formValue().pswd
    // if form is valid check if user exists.
    if (this.loginForm.valid) {
      this.suppliersService.getSupplierByCompanyAndPswd(cmpny, pswd).subscribe(x => {
        // if supplier exists
        if (x?.company === cmpny && x?.pswd === pswd) {
          this.suppliersService.storeSupplier(x)
          this.router.navigate(['nav']);
        } else {
          this.l_valid = 1;
        }
      })
    }
    else
      this.l_valid = 2
  }
}