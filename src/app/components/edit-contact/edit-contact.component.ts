import {Component, OnInit} from '@angular/core';
import {IContact} from "../../models/IContact.interface";
import {IGroup} from "../../models/IGroup.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];
  

  constructor(private activateRoute: ActivatedRoute,
              private contactService: ContactService,
              private router: Router) {
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(param => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.contactService.getContacto(this.contactId).subscribe(data => {
        this.contact = data;
        this.loading = false;
        this.contactService.getGrupos().subscribe(data => {
          this.groups = data;
        })
      }, error => {
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }

  public actualizar() {
    if (this.contactId) {
      this.contactService.editarContacto(this.contact, this.contactId)
        .subscribe((data) => {
          this.router.navigate(['/']).then();
        }, error => {
          this.errorMessage = error;
          this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
        });
    }
  }
}
