import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';

  constructor(private basketService: BasketService,
              private accountService:AccountService,
              private router:Router){

  }
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentuser();
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if(basketId) this.basketService.getBasket(basketId);
  }


  loadCurrentuser(){
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentuser(token).subscribe();
  }
}
