import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomNotification } from 'src/app/ShareNotification/notification';
import { UnitModel } from '../Model/unit-model';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-unit-setup',
  templateUrl: './product-unit-setup.component.html',
  styleUrls: ['./product-unit-setup.component.css']
})
export class ProductUnitSetupComponent implements OnInit {

  Title:string ="Product Unit Setup";
  UnitModel=new UnitModel();
  NotificationModel=new CustomNotification();
public Units:any;
public SearchBrand:any;
p=1;
btnName="Save";
  constructor(private service:ProductServiceService,private toster:ToastrService) { }

  ngOnInit(): void {
    this.getAllUnits();
  }
Clear()
{
  this.UnitModel.unitName="";
  this.UnitModel.unitId=0;
  this.btnName="Save";
}
  private getAllUnits():void
  {
    this.service.getAllUnit().subscribe(result=>{
        this.Units=result;

        console.log(this.Units);
    });

  }

  onSubmit()
  {
    if(this.UnitModel.unitId=="0")
    {
      this.service.AddUnit(this.UnitModel).subscribe(response=>{
          if(response=="0")
          {
            this.toster.error(this.NotificationModel.ExistMsg("Unit"),"Error");
          }
          else
          this.toster.success(this.NotificationModel.SuccessfullMsg("Unit"),"Success");
          this.getAllUnits();
          this.Clear();
      });
    }
    else
    {
      this.service.UpdateUnit(this.UnitModel,this.UnitModel.unitId).subscribe(response=>{
          if(response=="0")
          {
            this.toster.error(this.NotificationModel.ExistMsg("Unit"),"Error");
          }
          else
          this.toster.success(this.NotificationModel.UpdatedMsg("Unit"),"Update");
          this.getAllUnits();
          this.Clear();
      });
    }
  }

  Edit(datalist:any)
  {
    this.UnitModel=Object.assign({},datalist);
    this.btnName="Update";
  }
  Delete(UnitId:any)
  {
    if(confirm("Are you want to sure to delete"))
    {
     this.service.DeleteUnit(UnitId).subscribe(response =>{
        this.toster.success(this.NotificationModel.DeleteMsg('Unit'),'Deleted');
        this.getAllUnits();
     },
     error=>{

     });
    
    }
    else{

    }
  }


}
