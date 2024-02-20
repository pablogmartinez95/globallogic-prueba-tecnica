import { Component, Input } from '@angular/core';
import { Character } from '../../models/api.interface';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

export type ViewType = 'edit' | 'view';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Input() mode: ViewType = 'view';

  constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog) { }

  actionNavigateToEdit(id: number) {
    this.router.navigate(['character', 'edit', id]);
  }

  actionDeleteCharacter(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        this.apiService.deleteCharacter(id);
      }
    });
  }
}
