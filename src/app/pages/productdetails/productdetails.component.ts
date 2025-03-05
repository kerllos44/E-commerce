import { RegisterComponent } from './../register/register.component';

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { Iproduct } from '../../core/interfaces/products/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';


@Component({
  selector: 'app-productdetails',
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }





private readonly  _ActivatedRoute = inject(ActivatedRoute)


private readonly  _CartService = inject(CartService)

productID!:string

productDetails:Iproduct|null = null

constructor( private _ProductService:ProductService){}
ngOnInit(): void {
  
  this._ActivatedRoute.paramMap.subscribe({
    next: (param)=> {
      this.productID = param.get('p_id')  !;
      console.log(this.productID);
      
      
    }
  })


this._ProductService.getSpecificproducts(this.productID).subscribe({

  next:(res)=>{
    this.productDetails =  res.data
console.log(res);

  },
  error:(err)=>{
    console.log(err);
  }
})

}

addToCart(){
  this._CartService.AddProductTocard(this.productID).subscribe({
    next:(res)=>{
      console.log(res);
    },
    
  })
}


}
