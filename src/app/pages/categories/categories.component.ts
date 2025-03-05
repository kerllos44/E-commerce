import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [ CarouselModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy {
categoriesData!:ICategory[]
categoriesSub!:Subscription
CategoriesData!:ICategory[];
  constructor(private  _CategoriesService :CategoriesService ){}

  ngOnInit(): void {
      this._CategoriesService.getAllCategories().subscribe({

        next:(res)=> {
          this.categoriesData = res.data
          console.log(this.categoriesData);
            
        },

      });
  }

  ngOnDestroy(): void {
      this.categoriesSub?.unsubscribe()
  }

}