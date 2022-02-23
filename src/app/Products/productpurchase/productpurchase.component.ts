
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AutoComProduct } from '../Model/auto-com-product';
import { ProductModel } from '../Model/product-model';
import { Purchasegenralinfo } from '../Model/purchasegenralinfo';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-productpurchase',
  templateUrl: './productpurchase.component.html',
  styleUrls: ['./productpurchase.component.css']
})
export class ProductpurchaseComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three','Ona','Onv'];

  product=new ProductModel();
  purchase= new Purchasegenralinfo();
  SelectedHuman:AutoComProduct | undefined;
  datarray=[] as any;
  public productfilterContainer:any;
  public barCode:any;
  public productName:any;
  
  //public arrProduct:any;
  arrProduct=[
    {barCode:'',productName:''}
   
 
  ]
  arrFilterProduct!: Observable<AutoComProduct[]>;
 
  totQty:any;
  totBuyRate:any;
  totSubtotal:any;
  totItem:any;
 
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
/* service Call */

  private getAllproducts():void{
      this.service.getAllProductAutoComplete().subscribe(result=>{
        this.arrProduct=result;

       
      })
  }

  private productFilter(data:any):void{
    
    this.service.productfilter(data).subscribe(result=>{

      this.productfilterContainer=result;
     
      if(this.productfilterContainer!=null || this.productfilterContainer=="undefined")
      {

        var arryFind=this.datarray.filter((x: { barCode: any; })=>x.barCode===data);
       
        if(arryFind.length<=0)
        {
        this.product=new ProductModel();
        this.product.qty=1;
        this.product.barCode=this.productfilterContainer.barcode;
        this.product.productName=this.productfilterContainer.productName;
        this.product.buyRate=this.productfilterContainer.buyingPrice;
        this.product.subTotal=(Number(this.productfilterContainer.buyingPrice)*Number(this.product.qty))
        this.datarray.push(this.product);

        this.Calculation();
        }

        
      }


    })
  }

  /*End */

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
addProduct(datavalue:any):void
  {
   
    this.barCode=datavalue.barCode;
    this.productName=datavalue.productName;
/* start Call Service */

    this.productFilter(this.barCode);

/* End */
  
  }

  removeform(data:any)
  {
    
    this.datarray.splice(data,1);

    this.Calculation();
   
  }
  Calculation()
  {
    this.totQty = this.datarray.reduce((totqty: any, qty: any) => totqty + Number(qty.qty), 0);

     this.totBuyRate=this.datarray.reduce((totBuyRate:any,buyRate:any)=>totBuyRate+Number(buyRate.buyRate),0);
    
     this.totSubtotal=this.datarray.reduce((toSubtotal:any,subTotal:any)=>toSubtotal+Number(subTotal.subTotal),0)

    this.purchase.totalItem=this.datarray.length;
    this.purchase.totalAmount=this.totSubtotal;
    this.purchase.netAmount=this.totSubtotal;
    this.purchase.dueAmount=this.purchase.netAmount-this.purchase.paidAmount;
    this.onDiscount();
    this.onPaid();
    if(this.datarray.length==0)
    {
      this.purchase.discount=0;
      this.purchase.netAmount=0;
      this.purchase.paidAmount=0;
      this.purchase.dueAmount=0;
    }
  }
  onKeyup(data:any,index:any)
  {
    
    let qty=data.qty;
    let rate=data.buyRate;

    let subTotal=(Number(qty)*Number(rate));

    data.subTotal=subTotal;

    this.datarray[index]=data;
    this.Calculation();
  }

  onDiscount(){
    
    let result:number=0;

    if(this.purchase.discountType==1)
    {
      result= Number(this.purchase.totalAmount)*(Number(this.purchase.discount)/100);
      console.log(result);
      this.purchase.netAmount=this.purchase.totalAmount-result;
    }
    else if(this.purchase.discountType==2)
    {
      this.purchase.netAmount=this.purchase.totalAmount-this.purchase.discount;
    }
    else
    {
      this.purchase.discount=0;
    }
    
    this.purchase.dueAmount=this.purchase.netAmount-this.purchase.paidAmount;

  }

  onPaid(){
    this.purchase.dueAmount=this.purchase.netAmount-this.purchase.paidAmount;
  }

  onChangetype()
  {
    this.onDiscount();
    this.onPaid();
  }

  

  
  
}
