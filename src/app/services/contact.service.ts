import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {IContact} from "../models/IContact.interface";
import {IGroup} from "../models/IGroup.interface";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serverUrl: string = `http://localhost:9000`; //json-server
  constructor(private httClient: HttpClient) {
  }

// Obtener Contactos
  public getContactos(): Observable<IContact[]> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httClient.get<IContact[]>(dataUrl).pipe(
      catchError(this.mostrarError)
    );
  }

  // Obtner un Contacto
  public getContacto(contactId: string): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httClient.get<IContact>(dataUrl).pipe(
      catchError(this.mostrarError)
    );
  }

  // crear contacto
  public crearContacto(contact: IContact): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/`;
    return this.httClient.post<IContact>(dataUrl, contact).pipe(
      catchError(this.mostrarError)
    );
  }

  // Editar contacto
  public editarContacto(contact: IContact, contactId: string): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httClient.put<IContact>(dataUrl, contact).pipe(
      catchError(this.mostrarError)
    );
  }

  // Delete contacto
  public deleteContacto(contactId: string): Observable<{}> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httClient.delete<{}>(dataUrl).pipe(
      catchError(this.mostrarError)
    );
  }

  // Obtener Grupos
  public getGrupos(): Observable<IGroup[]> {
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.httClient.get<IGroup[]>(dataUrl).pipe(
      catchError(this.mostrarError)
    );
  }

  // Obtener un Grupo
  public getGroup(contact: IContact): Observable<IGroup> {
    let dataUrl: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httClient.get<IGroup>(dataUrl).pipe(
      catchError(this.mostrarError)
    );
  }

  // Error
  public mostrarError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // client error
      errorMessage = `Error: ${error.error.message}`
    } else {
      errorMessage = `Status: ${error.status} \n Mensaje: ${error.message}`
    }
    return throwError(errorMessage)
  }

}
