import { CategoriesComponent } from './../categories/categories.component';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { consumerAfterComputation } from '@angular/core/primitives/signals';
import { ProductService } from '../../core/services/products/product.service';
import { resolve } from 'node:path/win32';
import { Iproduct } from '../../core/interfaces/products/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { response } from 'express';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, UpperCasePipe, SearchPipe, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {



  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }


  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1280: {
        items: 6
      },
    },
    nav: true
  }


  searchValue: string = ''
  CategoriesData!: ICategory[]
  productsData!: Iproduct[]
  productsSub!: Subscription

  private readonly _AuthService = inject(AuthService)


  constructor(private _ProductService: ProductService, private _CategoriesService: CategoriesService, private _CartService: CartService, private toastr: ToastrService

  ) { }


  ngOnInit(): void {
    console.log(this._AuthService.userInfo);



    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.CategoriesData = res.data
      }
    })


    this.productsSub = this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.productsData = res.data
        // console.log(this.productsData);
      },
      error: (err) => {
        console.log(err);
      },

    })

  }

  addToCart(p_id: string) {
    this._CartService.AddProductTocard(p_id).subscribe({
      next: (res) => {
        console.log(res.numOfCartItems);

        this._CartService.cartCount.next(res.numOfCartItems);
        // next( to set value in behavior)
        console.log(this._CartService.cartCount );
        
        this.toastr.success(res.message, 'FreshCart', {
          closeButton: true,
          timeOut: 1500,
          progressBar:true,
          progressAnimation:'decreasing'


        }
        )
      },
      error: (err) => {
        console.log(err);

      },
    })
  }

  ngOnDestroy(): void {

    this.productsSub?.unsubscribe()
  }

}
