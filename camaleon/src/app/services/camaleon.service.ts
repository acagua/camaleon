import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CamaleonService {

  itemsLine1: any[] = [{
    image: "assets/img/medias.png", store: "pie de elefante", price: "1000"
  },
  {
    image: "assets/img/medias.png", store: "mamut", price: "20000"
  },
  {
    image: "assets/img/medias.png", store: "pie de elefante", price: "25000"
  },
  {
    image: "assets/img/medias.png", store: "pie de elefante", price: "7000"
  }];

  itemsLine2: any[] = [{
    image: "assets/img/medias.png", store: "pie de elefante", price: "1000"
  },
  {
    image: "assets/img/medias.png", store: "mamut", price: "20000"
  },
  {
    image: "assets/img/medias.png", store: "pie de elefante", price: "25000"
  },
  {
    image: "assets/img/medias.png", store: "pie de elefante", price: "7000"
  }];

  storesLine1: any[] = [
    {
      image: "assets/img/medias.png", store: "pie de elefante", price: "7000",
    },
    {
      image: "assets/img/medias.png", store: "pie de elefante", price: "7000",
    },
    {
      image: "assets/img/medias.png", store: "pie de elefante", price: "7000",
    }
  ];

  constructor() { }

  getItemsLine1(): any[] {
    return this.itemsLine1;
  }

  getItemsLine2(): any[] {
    return this.itemsLine2;
  }

  getStoresLine1(): any[] {
    return this.storesLine1;
  }

}
