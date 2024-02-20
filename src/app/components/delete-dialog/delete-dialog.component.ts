import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  template: `
  <h2 mat-dialog-title>¿Estas seguro de que quieres eliminar este personaje?</h2>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancelar</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Eliminar</button>
  </mat-dialog-actions>
  `,
  styles: ``
})
export class DeleteDialogComponent {

}
