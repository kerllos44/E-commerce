import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { Iproduct } from '../../core/interfaces/products/iproduct';
import { Subscription } from 'rxjs';
import { UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import {FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ UpperCasePipe , SearchPipe  , FormsModule , RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit ,OnDestroy {

productsData!:Iproduct[]
productsSub!:Subscription
searchValue:string = ''

  constructor(private  _ProductService :ProductService ){}


  ngOnInit(): void {
    this.productsSub =   this._ProductService.getAllProducts().subscribe({

         next:(res)=> {
          this.productsData = res.data
          console.log(this.productsData);
         
         },
         error:(err)=> {
          console.log(err);
          
             
         },

      })
  }

  ngOnDestroy(): void {
      this.productsSub?.unsubscribe()
  }

}
