import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomNotification } from 'src/app/ShareNotification/notification';

import { ProductSetup } from '../Model/product-setup';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-setup',
  templateUrl: './product-setup.component.html',
  styleUrls: ['./product-setup.component.css']
})
export class ProductSetupComponent implements OnInit {

  btnName:string="Save";
  Title:string ="Product Category Setup";
  p=1;
  CatName:any;

  dtOptions: DataTables.Settings = {};

  public Catgories:any;


  ProductSetupModel=new ProductSetup();

  NotificationModel=new CustomNotification();
   
  constructor(private service:ProductServiceService,private toster:ToastrService) { 
    
  }

  ngOnInit(): void {
   
    this.getAllCategories();
    console.log(this.getAllCategories());
    
  }

  private getAllCategories():void
  {
      this.service.getAllCategories().subscribe( result=>
        {
          this.Catgories=result;
        }
      );
  }
  Clear()
  {
    this.ProductSetupModel.categoryName="";
    this.btnName="Save";
    this.ProductSetupModel.catId="0";
  }
  onSubmit()
  {
   
    if(this.ProductSetupModel.catId=="0")
    {
      this.service.AddCategory(this.ProductSetupModel).subscribe(
        response => {
          console.log(response);
          if(response=="0")
          {
            this.toster.error(this.NotificationModel.ExistMsg('Category'),'Error');
          }
          else
          this.toster.success(this.NotificationModel.SuccessfullMsg('Category'),'Success');
          
          this.getAllCategories();
          this.Clear();
        },
        error => {
          console.log(error);
        });
    }
    else
    {
      this.service.UpdateCategory(this.ProductSetupModel,this.ProductSetupModel.catId).subscribe(
        response => {
          console.log(response);
          
          this.toster.success(this.NotificationModel.UpdatedMsg('Category'),'Updated');
          
          this.getAllCategories();
          this.Clear();
        },
        error => {
          console.log(error);
        });
    }
    


  }
  Edit(dataList:any)
  {
    this.ProductSetupModel=Object.assign({},dataList) ;
    //this.ProductSetupModel=selecteddata;
    this.btnName="Update";
  }

  Delete(CatId:any)
  {
   // this.ProductSetupModel=Object.assign({},dataList);
    if(confirm("Are you want to sure to delete"))
    {
     this.service.DeleteCategory(CatId).subscribe(response =>{
        this.toster.success(this.NotificationModel.DeleteMsg('Category'),'Deleted');
        this.getAllCategories();
     },
     error=>{

     });
    
    }
    else{

    }
  }
  
}
