import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../../services/contact.service";
import {IContact} from "../../models/IContact.interface";
import {IGroup} from "../../models/IGroup.interface";

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private contactService: ContactService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (param) => {
        this.contactId = param.get('contactId');
        console.log(this.contactId)
      }
    );
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContacto(this.contactId)
        .subscribe((data) => {
          this.contact = data;
          this.loading = false;
          this.contactService.getGroup(data).subscribe((data) => {
            this.group = data;
            console.log(data)
          })
        }, error => {
          this.errorMessage = error;
          this.loading = false;
        })
    }
  }

  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
