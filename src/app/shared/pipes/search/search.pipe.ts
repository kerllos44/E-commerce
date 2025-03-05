import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search' ,
  pure:true

})
export class SearchPipe implements PipeTransform {

  transform( arr:any[] , searchKey:string ):any[] {
    return arr.filter( (current)=> current.title.toLowerCase().includes(searchKey.toLowerCase())  ) ;
  }

}
