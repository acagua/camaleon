import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactService } from 'src/app/services/contact.service';
import { ContactMessage } from 'src/app/models/contactMessage.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})

export class ContactComponent implements OnInit
{
  formContact: FormGroup;

  constructor(private _contactService: ContactService)
  {

  }


  ngOnInit()
  {
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
