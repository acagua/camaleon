import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payu-response',
  templateUrl: './payu-response.component.html'
})
export class PayuResponseComponent implements OnInit {

  transactionDate: string;
  referenceCode: string;
  amount: string;
  responseCode: string;

  transactionState: string;
  transactionStateStr: string;

  paymentMethod: string;
  paymentMethodStr: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {

      this.transactionDate = params['processingDate'];
      this.referenceCode = params['referenceCode'];
      this.amount = params['TX_VALUE'];
      this.responseCode = params['lapResponseCode'];

      this.transactionState = params['transactionState'];
        switch (this.transactionState) {
          case '4':
            this.transactionStateStr = 'Aprobada';
            break;
          case '5':
            this.transactionStateStr = 'Expirada';
            break;
          case '6':
            this.transactionStateStr = 'Declinada';
            break;
          case '7':
            this.transactionStateStr = 'Pediente';
            break;
          case '104':
            this.transactionStateStr = 'Error';
            break;
          default:
            console.log('Lo lamentamos, respuesta no identificada ' + this.transactionState + '.');
        }

        this.paymentMethod = params['polPaymentMethodType'];
        switch (this.paymentMethod) {
          case '2':
            this.paymentMethodStr = 'Tarjeta de crédito';
            break;
          case '4':
            this.paymentMethodStr = 'Transferencia bancaria PSE';
            break;
          case '5':
            this.paymentMethodStr = 'Débito ACH';
            break;
          case '6':
            this.paymentMethodStr = 'Tarjeta débito';
            break;
          case '7':
            this.paymentMethodStr = 'Pago en efectivo';
            break;
          case '8':
            this.paymentMethodStr = 'Pago referenciado';
            break;
          case '10':
            this.paymentMethodStr = 'Pago en banco';
            break;
          case '14':
            this.paymentMethodStr = 'Transferencia bancaria SPEI';
            break;
          default:
            console.log('Lo lamentamos, metodo no identificado ' + this.paymentMethod + '.');
        }

      });
  }
  ngOnInit() {
  }

}