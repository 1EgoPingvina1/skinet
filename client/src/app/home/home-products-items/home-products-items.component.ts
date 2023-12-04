import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/products';

@Component({
  selector: 'app-home-products-items',
  templateUrl: './home-products-items.component.html',
  styleUrls: ['./home-products-items.component.scss']
})
export class HomeProductsItemsComponent {
  @Input() product?: Product;

}
