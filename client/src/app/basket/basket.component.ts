import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from '../shared/models/basket';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  constructor(public basketService: BasketService){
    
  }

  incementQuantity(item: BasketItem){
    this.basketService.addItemToBasket(item);
  }

  removeItem(event: {id:number,quantity:number}){
    this.basketService.removeItemFromBasket(event.id,event.quantity);
  }
}
