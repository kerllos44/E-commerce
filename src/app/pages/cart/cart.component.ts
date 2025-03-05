import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService)

  cartData:ICart = {} as ICart

  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartData = res.data
      },
      error: (err) => {
        console.log(err);
      },

    })
  }
  deleteItemFromCart(p_id:string){
    this._CartService.RemoveSpecificCartItem(p_id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this._CartService.cartCount.next(res.numOfCartItems);
        this.cartData = res.data
      },
    })
  }
  updateCount(p_id:string , count:number){
    this._CartService.UpdateCartProductQuan(p_id , count).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartData = res.data
      },
    })
  }

  clearItems():void{
    this._CartService.clearCart().subscribe({

next:(res)=> {
    console.log(res);
    if (res.message === 'success') {
        this.cartData = {} as ICart 
    }
},
error:(err)=> {
  console.log(err);
  
    
},
   
       
    })
  }

}
