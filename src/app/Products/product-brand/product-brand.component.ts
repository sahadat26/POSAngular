import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomNotification } from 'src/app/ShareNotification/notification';
import { BrandModel } from '../Model/brand-model';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.css']
})
export class ProductBrandComponent implements OnInit {

Title:string ="Product Brand Setup";
BrandModel=new BrandModel();
NotificationModel=new CustomNotification();
public Brands:any;
public SearchBrand:any;
p=1;
btnName="Save";
  constructor(private service:ProductServiceService,private toster:ToastrService) { }

  ngOnInit(): void {
    this.getAllBrands();
  }
Clear()
{
  this.BrandModel.brandName="";
  this.BrandModel.brandId=0;
  this.btnName="Save";
}
  private getAllBrands():void
  {
    this.service.getAllBrand().subscribe(result=>{
        this.Brands=result;

        console.log(this.Brands);
    });

  }

  onSubmit()
  {
    if(this.BrandModel.brandId=="0")
    {
      this.service.AddBrand(this.BrandModel).subscribe(response=>{
          if(response=="0")
          {
            this.toster.error(this.NotificationModel.ExistMsg("Brand"),"Error");
          }
          else
          this.toster.success(this.NotificationModel.SuccessfullMsg("Brand"),"Success");
          this.getAllBrands();
          this.Clear();
      });
    }
    else
    {
      this.service.UpdateBrand(this.BrandModel,this.BrandModel.brandId).subscribe(response=>{
          if(response=="0")
          {
            this.toster.error(this.NotificationModel.ExistMsg("Brand"),"Error");
          }
          else
          this.toster.success(this.NotificationModel.UpdatedMsg("Brand"),"Update");
          this.getAllBrands();
          this.Clear();
      });
    }
  }

  Edit(datalist:any)
  {
    this.BrandModel=Object.assign({},datalist);
    this.btnName="Update";
  }
  Delete(brandId:any)
  {
    if(confirm("Are you want to sure to delete"))
    {
     this.service.DeleteBrand(brandId).subscribe(response =>{
        this.toster.success(this.NotificationModel.DeleteMsg('Brand'),'Deleted');
        this.getAllBrands();
     },
     error=>{

     });
    
    }
    else{

    }
  }

}
