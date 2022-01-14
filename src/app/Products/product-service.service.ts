import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSetup } from './Model/product-setup';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private basePath='http://192.168.10.4:41731/product';

  CategoryData:ProductSetup=new ProductSetup()
  constructor(private http:HttpClient) { 

  }
  public getAllCategories():Observable<any>{
    return this.http.get(this.basePath+'/getAllCategories');
  }

  public getAllBrand():Observable<any>{
    return this.http.get(this.basePath+'/getAllBrands');
  }
  public getAllUnit():Observable<any>{
    return this.http.get(this.basePath+'/GetUnit');
  }

  public AddCategory(_ProductSetupModel: any):Observable<any>
  {
    return this.http.post<any>(this.basePath+'/AddNewCategory',_ProductSetupModel);
  }
  public AddBrand(_BrandModel:any):Observable<any>{
    return this.http.post<any>(this.basePath+'/AddNewBrand',_BrandModel);
  }

  public AddUnit(_UnitModel:any):Observable<any>{
    return this.http.post<any>(this.basePath+'/AddNewUnit',_UnitModel);
  }
  public UpdateCategory(_ProductSetupModel:any,CatId:any):Observable<any>
  {
    return this.http.put<any>(this.basePath+'/UpdateCatgeory/'+CatId,_ProductSetupModel);
  }
  public UpdateBrand(_BrandModel:any,BrandId:any):Observable<any>
  {
    return this.http.put<any>(this.basePath+'/UpdateBrand/'+BrandId,_BrandModel);
  }
  public UpdateUnit(_UnitModel:any,UnitId:any):Observable<any>
  {
    return this.http.put<any>(this.basePath+'/UpdateUnit/'+UnitId,_UnitModel);
  }
  public DeleteCategory(CatId:any):Observable<any>{
    return this.http.delete<any>(this.basePath+'/DeleteCatgeory/'+CatId);
  }
  public DeleteBrand(Id:any):Observable<any>{
    return this.http.delete<any>(this.basePath+'/DeleteBrand/'+Id);
  }
  public DeleteUnit(Id:any):Observable<any>{
    return this.http.delete<any>(this.basePath+'/DeleteUnit/'+Id);
  }



  

   
  
}
