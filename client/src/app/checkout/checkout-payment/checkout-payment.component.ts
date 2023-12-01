import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { Address } from 'src/app/shared/models/user';
import { NavigationExtras, Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?:ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?:ElementRef;
  @ViewChild('cardCvc') cardCVVElement?:ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCVV?: StripeCardCvcElement;
  cardErrors:any;

  constructor(private basketService:BasketService, 
              private checkoutService:CheckoutService,
              private toastr:ToastrService,
              private router:Router){}

  ngOnInit(): void {
    loadStripe('pk_test_51OIIw0Es7N2deovILxN6nzZZDf5t9nW9cAMyJgwTw2Ih9aoQYqlBWEVmQBTAJLACJQRLKvYLKCgQe6hYZnJwwJB300V7OLc18P')
      .then(stripe => {
        this.stripe = stripe;
        const elements = stripe?.elements();
        if(elements){
          this.cardNumber = elements.create('cardNumber');
          this.cardNumber.mount(this.cardNumberElement?.nativeElement);
          this.cardNumber.on('change', event => {
            if(event.error){
              this.cardErrors = event.error.message;
            }
            else{
              this.cardErrors = null;
            }
          })

          this.cardExpiry = elements.create('cardExpiry');
          this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
          this.cardExpiry.on('change', event => {
            if(event.error){
              this.cardErrors = event.error.message;
            }
            else{
              this.cardErrors = null;
            }
          })

          this.cardCVV = elements.create('cardCvc');
          this.cardCVV.mount(this.cardCVVElement?.nativeElement);
          this.cardCVV.on('change', event => {
            if(event.error){
              this.cardErrors = event.error.message;
            }
            else{
              this.cardErrors = null;
            }
          })
        }
      })
  }

  submitOrder(){
    const basket = this.basketService.getCurrentBasketValue();
    if(!basket){
      return;
    }
    const OrderToCreate = this.getOrderToCreate(basket);
    if(!OrderToCreate) return;
    this.checkoutService.createOrder(OrderToCreate).subscribe({
      next: order => 
      {
        this.toastr.success('Order created successfully')
        this.stripe?.confirmCardPayment(basket.clientSecret!,{
          payment_method: {
            card: this.cardNumber!,
            billing_details:{
              name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
            }
          }
        }).then(result => {
          console.log(result);
          if(result.paymentIntent){
            this.basketService.deleteLocalBasket();
            const navigationExtras: NavigationExtras = {state:order};
            this.router.navigate(['checkout/success'],navigationExtras)
          }
        })
      }
    });
  }

  private getOrderToCreate(basket: Basket) {
    const deliveryMethod = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;
    if(!deliveryMethod || !shipToAddress) return;
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethod,
      shipToAddress: shipToAddress
    }
  }
}