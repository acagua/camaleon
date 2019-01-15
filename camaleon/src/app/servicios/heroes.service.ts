import { Injectable } from '@angular/core';

@Injectable()
export class HeroesService {

  private heroes: Heroe[] = [
    {
      nombre: "Medias",
      bio: "Protector de cable para el extremo, perfecto para evitar el daño típico de cable",
      img: "assets/img/medias.png",
      aparicion: "1941-11-01",
      casa: "DC"
    },
    {
      nombre: "Organizadores",
      bio: "Protectores de cable e espiral para todo el cable, cada unidad tiene 50cm de largo",
      img: "assets/img/organizadores.JPEG",
      aparicion: "1939-05-01",
      casa: "DC"
    },
    {
      nombre: "Protectores",
      bio: "",
      img: "assets/img/protectores.jpeg",
      aparicion: "1939-05-01",
      casa: "DC"
    }

  ];

  constructor() {
    console.log("Servicio listo para usarse");
  }

  getHeroes(): Heroe[] {
    return this.heroes;
  }

  getHeroe(idx: string): Heroe {
    return this.heroes[idx];
  }

  buscarHeroes(termino: string) {
    let heroesArr: Heroe[] = [];

    termino = termino.toLowerCase();

    console.log('termino a buscar: ' + termino);

    for (let heroe of this.heroes) {
      let nombre = heroe.nombre.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        heroesArr.push(heroe);
      }
    }
    return heroesArr;
  }
}

export interface Heroe {
  nombre: string,
  bio: string,
  img: string,
  aparicion: string,
  casa: string
}
