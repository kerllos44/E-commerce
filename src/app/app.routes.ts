import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth-layout/auth/auth.component';
import { MainComponent } from './layouts/main-layout/main/main.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path:'',  component:AuthComponent , children:[
        {path:'login' ,  component:LoginComponent  , title:'Login'},
        {path:'register' , loadComponent: ()=> import('./pages/register/register.component').then((classes)=>classes.RegisterComponent ) , title:'Register'},
        {path:'forget' ,  component:ForgetpasswordComponent , title:'forget'},
    ]},


    {path:'',  component:MainComponent , children:[
        {path:'' , redirectTo:'home' , pathMatch: 'full'},
        {path:'home' ,  component:HomeComponent  , title:'Home' , canActivate:[authGuard] },
        {path:'products' ,  loadComponent:()=> import('./pages/products/products.component').then((classes)=>classes.ProductsComponent ), title:'Products' , canActivate:[authGuard]},
        {path:'brands' ,  loadComponent:()=> import('./pages/brands/brands.component').then((classes)=>classes.BrandsComponent ) , title:'Brands' , canActivate:[authGuard]},
        {path:'categories' ,  loadComponent:()=> import('./pages/categories/categories.component').then((classes)=>classes.CategoriesComponent ) , title:'Categories' , canActivate:[authGuard]},
        {path:'cart' ,  loadComponent:()=> import('./pages/cart/cart.component').then((classes)=>classes.CartComponent ) , title:'Cart' , canActivate:[authGuard]},
        {path:'allorders' ,  loadComponent:()=> import('./pages/allorders/allorders.component').then((classes)=>classes.AllordersComponent ) , title:'all orders' , canActivate:[authGuard]},
        {path:'checkout/:c_id' ,  loadComponent:()=> import('./pages/checkout/checkout.component').then((classes)=>classes.CheckoutComponent ) , title:'check out' },
        {path:'product-details/:p_id' ,  loadComponent:()=> import('./pages/productdetails/productdetails.component').then((classes)=>classes.ProductdetailsComponent ) , title:'Details'},
        {path:'**' , component:NotfoundComponent , title:'Error404'}
    ]},
    
];
