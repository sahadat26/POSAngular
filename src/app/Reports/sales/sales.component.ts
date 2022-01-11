import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  value="0";
  constructor() { }

  ngOnInit(): void {
  }
   test()
  {
    this.value="10";
  }

}
