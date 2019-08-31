import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactService } from 'src/app/services/contact.service';
import { ContactMessage } from 'src/app/models/contactMessage.model';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})

export class ContactComponent implements OnInit
{
  formContact: FormGroup;
  title = 'Contactanos';
  constructor(private _contactService: ContactService, private titleService: Title, private meta: Meta)
  {

  }

  ngOnInit()
  {
    this.titleService.setTitle(this.title);
    this.meta.addTag({name: 'keywords', content: 'Camaleon.shop, Camaleon, Contactanos, Contacto, Entrar, Hacer parte'});
    this.meta.addTag({name: 'description', content: 'Contáctanos para si quieres hacer parte de Camaleon o si tienes alguna duda'});
    this.meta.addTag({name: 'robots', content: 'all, follow'});

    window.scrollTo(0, 0);

    this.formContact = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      message: new FormControl(null, Validators.required),
    });
  }


  sbContact()
  {
    const formContactValue = this.formContact.value;

    let contactMessage: ContactMessage = new ContactMessage(formContactValue.name, formContactValue.lastName, formContactValue.email, formContactValue.message, formContactValue.phone);

    this._contactService.sendContactMessage(contactMessage)
      .subscribe(resp =>
      {
        Swal.fire('Gracias!', 'Tu mensaje ha sido enviado al equipo de Camaleon, nos pondremos en contacto lo más pronto posible ;)', 'success');
      });
  }


}
