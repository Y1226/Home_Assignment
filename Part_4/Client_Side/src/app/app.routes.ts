import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AddmdseComponent } from './Components/addmdse/addmdse.component';
import { NavComponent } from './Components/nav/nav.component';
import { ViewComponent } from './Components/view/view.component';
import { ApproveComponent } from './Components/approve/approve.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'addMdse', component: AddmdseComponent},
    {path:'nav', component: NavComponent, children: [
        {path:'', component: ViewComponent},
        {path:'approve', component: ApproveComponent}
    ]}
];
