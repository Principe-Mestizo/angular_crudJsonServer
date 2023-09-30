import {Component, OnInit} from '@angular/core';
import {IContact} from "../../models/IContact.interface";
import {ContactService} from "../../services/contact.service";
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  //modal 
  public showDialog: boolean = false; // Variable para controlar la visualización del diálogo modal
  public contactToDeleteId: string | undefined;
  
  constructor(private contactoService: ContactService,
    private route:Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.contactoService.getContactos().subscribe((data) => {
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    });
  }

  // public getContactFromServer() {
  //
  // }

  public clickDeleteContact(contactId: string | undefined) {
    if (contactId) {
      this.contactToDeleteId = contactId; // Guardar el ID del contacto a eliminar
      this.showDialog = true; // Mostrar el diálogo modal
    }
  }

  public confirmDeleteContact() {
    if (this.contactToDeleteId) {
      this.contactoService.deleteContacto(this.contactToDeleteId).subscribe(
        data => {
          // Eliminar el contacto de la lista de contactos (opcional)
          this.contacts = this.contacts.filter(contact => contact.id !== this.contactToDeleteId)
          // Cierra el diálogo modal después de 2 segundos
          setTimeout(() => {
            this.showDialog =false;
          }, 2000);
          
        },
        error => {
          this.errorMessage = error;
        }
      );
    }
  }
  
}
