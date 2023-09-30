import {Component, OnInit} from '@angular/core';
import {IContact} from "../../models/IContact.interface";
import {IGroup} from "../../models/IGroup.interface";
import {ContactService} from "../../services/contact.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(private contactoService: ContactService,
              private router: Router) {
  }

  ngOnInit() {
    this.contactoService.getGrupos().subscribe((data) => {
      this.groups = data;
    }, error => {
      this.errorMessage = error;
    })
  }

  public enviar() {
    this.contactoService.crearContacto(this.contact)
      .subscribe((data) => {
        this.router.navigate(['/']).then();
      }, error => {
        this.errorMessage = error;
        this.router.navigate(['/contacts/add']).then();
      });
  }
}
