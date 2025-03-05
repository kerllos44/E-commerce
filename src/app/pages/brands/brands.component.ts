import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brands/brand.service';
import { Subscription } from 'rxjs';
import { IBrand } from '../../core/interfaces/brands/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit , OnDestroy{

brandsData!:IBrand[]
brandsSub!:Subscription

constructor(private _BrandService :BrandService){}

ngOnInit(): void {
    this._BrandService.getAllBrands().subscribe({
next:(res)=> {

  this.brandsData = res.data
  console.log(this.brandsData);
    

},



    });
}

ngOnDestroy(): void {
    this.brandsSub?.unsubscribe()
}



}