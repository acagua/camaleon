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

  getItemsStore(storeId: number)
  {
    const itemsStore = [];

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].store == storeId) {
        itemsStore.push(this.items[i]);
      }
    }

    return itemsStore;
  }



  //TODO todo se debe pasar a mongo o dynamo
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  stores: any[] = [{
    id: "1", image: "assets/img/clientes/logo_pie_de_elefante.jpg", name: "Pie de Elefante", description: "Somos una tienda de muchas cosas bellas! Nacimos en el 2015 con el deseo de combinar el arte con artículos cotidianos como cuadernos, libretas. Marca 100% colombiana!"
  },
  {
    id: "2", image: "assets/img/medias.png", name: "pie de elefante", description: "Somos una tienda de muchas cosas bellas!"
  },
  {
    id: "3", image: "assets/img/medias.png", name: "pie de elefante", description: "Somos una tienda de muchas cosas bellas!"
  }];

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  items: any[] = [{
    id: "1", name: "Típicas Tucanes", image: "assets/img/clientes/tipicas_Tucanes.jpg", store: "1", storeName: "Pie de Elefante", price: "9000", description: "Hola soy un par de medias"
  },
  {
    id: "2", name: "Holandés Arabesco Morado", image: "assets/img/clientes/holandes_Arabescos-morado.jpg", store: "1", storeName: "Pie de Elefante", price: "20000"
  },
  {
    id: "3", name: "Argollado Letras", image: "assets/img/clientes/argollado_Letras Argollado.jpg", store: "1", price: "25000", storeName: "Pie de Elefante"
  },
  {
    id: "3", name: "Bradel Azul", image: "assets/img/clientes/bradel_Azul-v7ma.jpg", store: "1", price: "25000", storeName: "Pie de Elefante"
  },
  {
    id: "5", name: "Hojas Sueltas Letras", image: "assets/img/clientes/hojasSueltas_PDE.jpg", store: "1", price: "1000", storeName: "Pie de Elefante"
  },
  {
    id: "6", name: "Kids Paletas", image: "assets/img/clientes/kids_Paletas.jpg", store: "1", price: "20000", storeName: "Pie de Elefante"
  },
  {
    id: "7", name: "Planner Mensual", image: "assets/img/clientes/plannerMensual_Meses planeador mensual.jpg", store: "1", price: "25000", storeName: "Pie de Elefante"
  },
  {
    id: "8", name: "Típicas Iglesia", image: "assets/img/clientes/tipicas_Iglesia.jpg", store: "1", price: "7000", storeName: "Pie de Elefante"
  },
  {
    id: "8", name: "Típicas Mercado", image: "assets/img/clientes/tipicas_Mercado.jpg", store: "1", price: "7000", storeName: "Pie de Elefante"
  }];

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  itemsLine1: any[] = [];

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  itemsLine2: any[] = [];

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  storesLine1: any[] = [];

}