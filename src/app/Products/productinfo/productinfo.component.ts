import { Component, OnInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomNotification } from 'src/app/ShareNotification/notification';
import { Productinfo } from '../Model/productinfo';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})

export class ProductinfoComponent implements OnInit {
  //@ViewChild("barcode") _el: ElementRef;
 
 
  
  productInfoModel=new Productinfo();
  btnName="Save";
  hasErrorCat=true;
  hasErrorBrand=true;
  hasErrorUnit=true;
  public Category:any;
  public Brands :any;
  public Units:any;
  public AllProducts:any;
  p=1;
  flag:any=0;
  public SearchProduct:any;
  NotificationModel=new CustomNotification();

  constructor(private service:ProductServiceService,private toster:ToastrService) { }

  ngOnInit(): void {
    this.getAllUnits();
    this.getAllBrands();
    this.getAllcategory();
    this.getAllProduct();
  }

  clear():void{
    this.productInfoModel.barcode="";
    this.productInfoModel.brandId="0";
    this.productInfoModel.catId="0";
    this.productInfoModel.productName="";
    this.productInfoModel.unitId="0";
    this.productInfoModel.buyingPrice="";
    this.productInfoModel.sellPrice="0";
    this.productInfoModel.openingStock="0";
    this.productInfoModel.orderLimit="";
  }
 
  onSubmit():void{

    if(this.flag=="0")
    {
      this.service.AddNewProduct(this.productInfoModel).subscribe(response=>{
        if(response=="0")
        {
          this.toster.error(this.NotificationModel.ExistMsg("Barcode"),"Error");
        }
        else{
          this.toster.success(this.NotificationModel.SuccessfullMsg("New Product"),"Success");
          this.getAllProduct();
          this.clear();
        }
      })
    }
    else
    {
      this.service.UpdateProduct(this.productInfoModel,this.productInfoModel.barcode).subscribe(response=>{
       
          this.toster.success(this.NotificationModel.UpdatedMsg("Product"),"Updated");
          this.getAllProduct();
          this.clear();
          this.btnName="Save";
          this.flag="0";
      })
    }
   
      
  }
  private getAllUnits():void
  {
    this.service.getAllUnit().subscribe(result=>{
        this.Units=result;

       
    });

  }

  private getAllBrands():void
  {
    this.service.getAllBrand().subscribe(result=>{
        this.Brands=result;

       
    });

  }

  private getAllProduct():void
  {
    this.service.getAllProduct().subscribe(result=>{
      this.AllProducts=result;
      console.log(this.AllProducts);
    });
  }

  private getAllcategory():void{
    this.service.getAllCategories().subscribe(result=>{
      this.Category=result;
    
    })
  }

  public Edit(datalist:any):void{
    
    this.productInfoModel=Object.assign({},datalist);
    this.flag="1";
    this.btnName="Update";
    this.hasErrorBrand=false;
    this.hasErrorCat=false;
    this.hasErrorUnit=false;

    window.scrollTo(0,0);
   
  }

  public Delete(barcodeNumber:any):void
  {
    if(confirm("Are you want to sure to delete"))
    {
     this.service.DeleteProduct(barcodeNumber).subscribe(response =>{
        this.toster.success(this.NotificationModel.DeleteMsg('Product'),'Deleted');
        this.getAllProduct();
        this.clear();
     },
     error=>{

     });
    
    }
    else{

    }
  }

  CustomValidateCat(value:any)
  {
    
    if(value=="0")
    {
      this.hasErrorCat=true;
    }
    else
    this.hasErrorCat=false;
  }

  CustomValidateBrand(value:any)
  {
   
    if(value=="0")
    {
      this.hasErrorBrand=true;
    }
    else
    this.hasErrorBrand=false;
  }

  CustomValidateUnit(value:any)
  {
   
    if(value=="0")
    {
      this.hasErrorUnit=true;
    }
    else
    this.hasErrorUnit=false;
  }
}
