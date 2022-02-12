
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AutoComProduct } from '../Model/auto-com-product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-productpurchase',
  templateUrl: './productpurchase.component.html',
  styleUrls: ['./productpurchase.component.css']
})
export class ProductpurchaseComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three','Ona','Onv'];

  SelectedHuman:AutoComProduct | undefined;

  
  //public arrProduct:any;
  arrProduct=[
    {barCode:'',productName:''}
   
 
  ]
  arrFilterProduct!: Observable<AutoComProduct[]>;
 


 
  filteredOptions!: Observable<string[]>;
  constructor(private service:ProductServiceService){
    
  }
  ngOnInit() {
    
    

    this.arrFilterProduct = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
    );

    this.getAllproducts();
  }

  private getAllproducts():void{
      this.service.getAllProductAutoComplete().subscribe(result=>{
        this.arrProduct=result;

        console.log(this.arrProduct);
      })
  }
  private _filter(value: any): AutoComProduct[] {
    //const filterValue = value.toLowerCase();

   // return this.options.filter(option => option.toLowerCase().includes(filterValue));

   return this.arrProduct.filter((item: any) => {
   
    if (typeof value === 'object') { value = "" };
    const TempString = item.barCode + ' - ' + item.productName;
    return TempString.toLowerCase().includes(value.toLowerCase());

  });
}

AutoCompleteDisplay(item: any): string {
  if (item == undefined) { return "" }
  return item.barCode + ' - ' + item.productName;
}
  test(datvalue:any):void
  {
    console.log(datvalue);

    console.log(this.SelectedHuman);
  }

  
  
}
