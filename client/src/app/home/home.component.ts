import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/products';
import { ShopService } from '../shop/shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  shopParams = new ShopParams();
  totalCount = 0;

  
  constructor(private shopService:ShopService) {

  }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)    
    });
  }

  onPageChanged(event:any){
    if(this.shopParams.pageNumber !== event.page){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
}
