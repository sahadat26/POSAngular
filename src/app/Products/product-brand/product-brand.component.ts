import { Component, OnInit } from '@angular/core';
import { BrandModel } from '../Model/brand-model';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.css']
})
export class ProductBrandComponent implements OnInit {

  Title:string ="Product Brand Setup";
  BrandModel=new BrandModel();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    console.log(this.BrandModel);
  }

}
