import { Component } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { Product } from 'src/app/shared/models/products';
import { Type } from 'src/app/shared/models/type';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  totalCount = 0;
}
