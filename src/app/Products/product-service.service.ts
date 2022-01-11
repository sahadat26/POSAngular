import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSetup } from './Model/product-setup';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private basePath='http://192.168.10.4:41731/api/product';

  CategoryData:ProductSetup=new ProductSetup()
  constructor(private http:HttpClient) { 

  }
  public getAllCategories():Observable<any>{
    return this.http.get(this.basePath+'/getAllCategories');
  }

  public AddCategory(_ProductSetupModel: any)
  {
    return this.http.post<any>(this.basePath,_ProductSetupModel);
  }
  public UpdateCategory(_ProductSetupModel:any,CatId:any)
  {
    return this.http.put<any>(this.basePath+'/'+CatId,_ProductSetupModel);
  }
  
  
}
