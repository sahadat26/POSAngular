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
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu:[5,10,15,20,50],
     
     
      processing: true

    };

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
  Edit(selecteddata:any)
  {
    this.ProductSetupModel=Object.assign({},selecteddata) ;
    //this.ProductSetupModel=selecteddata;
    this.btnName="Update";
  }

  Search()
  {
    alert(this.CatName);
    if(this.CatName=="")
    {
      this.getAllCategories();
    }
     
    else
      {
        return this.Catgories.filter((x: string | string[]) => x.includes(this.CatName))
      }
  }
}
