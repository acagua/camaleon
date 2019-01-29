import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CamaleonService
{
  constructor()
  {
    for (let i = 0; i < 4; i++) {
      this.itemsLine1.push(this.items[i]);
    }

    for (let i = 4; i < 8; i++) {
      this.itemsLine2.push(this.items[i]);
    }

    for (let i = 0; i < 3; i++) {
      this.storesLine1.push(this.stores[i]);
    }

    console.log(this.itemsLine1);

  }

  getItemsLine1(): any[]
  {
    return this.itemsLine1;
  }

  getItemsLine2(): any[]
  {
    return this.itemsLine2;
  }

  getStoresLine1(): any[]
  {
    return this.storesLine1;
  }

  getItem(itemId: number)
  {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == itemId) {
        return this.items[i];
      }
    }
  }

  getStore(storeId: number)
  {
    for (let i = 0; i < this.stores.length; i++) {
      if (this.stores[i].id == storeId) {
        return this.stores[i];
      }
    }
  }



  //TODO todo se debe pasar a mongo o dynamo
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  stores: any[] = [{
    id: "1", image: "assets/img/medias.png", name: "Pie de Elefante", description: "Somos una tienda de muchas cosas bellas!"
  },
  {
    id: "2", image: "assets/img/medias.png", name: "pie de elefante", description: "Somos una tienda de muchas cosas bellas!"
  },
  {
    id: "3", image: "assets/img/medias.png", name: "pie de elefante", description: "Somos una tienda de muchas cosas bellas!"
  }];

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  items: any[] = [{
    id: "1", image: "assets/img/Fuxia-morado.jpg", store: "1", price: "9000", description: "Hola soy un par de medias"
  },
  {
    id: "2", image: "assets/img/clientes/Azul-v7ma.jpg", store: "1", price: "20000"
  },
  {
    id: "3", image: "assets/img/medias.png", store: "pie de elefante", price: "25000"
  },
  {
    id: "4", image: "assets/img/medias.png", store: "pie de elefante", price: "7000"
  },
  {
    id: "5", image: "assets/img/medias.png", store: "pie de elefante", price: "1000"
  },
  {
    id: "6", image: "assets/img/medias.png", store: "mamut", price: "20000"
  },
  {
    id: "7", image: "assets/img/medias.png", store: "pie de elefante", price: "25000"
  },
  {
    id: "8", image: "assets/img/medias.png", store: "pie de elefante", price: "7000"
  }];

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  itemsLine1: any[] = [];

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  itemsLine2: any[] = [];

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  storesLine1: any[] = [];

}
