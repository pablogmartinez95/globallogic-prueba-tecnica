import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Character, Species, Status } from '../../models/api.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {
  public character!: Character;
  public actionType!: string;

  public speciesType = Object.values(Species).filter(value => typeof value === 'string');
  public statusTypes = Object.values(Status).filter(value => typeof value === 'string');

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private apiService: ApiService) {
    const actionType = this.activatedRoute.snapshot.data['action'];
    this.actionType = actionType;

    if (actionType === 'create') {
      this.character = {
        id: 0,
        name: '',
        status: Status.Alive,
        species: Species.Human,
        image: '',
        location: ''
      };
    } else {
      const characterId = parseInt(this.activatedRoute.snapshot.params['id']);

      const findedCharacter = this.apiService.readCharacter(characterId);

      if (!findedCharacter) return;

      this.character = {
        id: findedCharacter.id,
        name: findedCharacter.name,
        status: findedCharacter.status,
        species: findedCharacter.species,
        image: findedCharacter.image,
        location: findedCharacter.location
      };
    }
  }

  public updateCharacter(): void {
    this.apiService.updateCharacter(this.character);
    this.router.navigate(['/']);
  }

  public createCharacter(): void {
    this.apiService.createCharacter(this.character);
    this.router.navigate(['/']);
  }

  public cancelEditing(): void {
    this.router.navigate(['/']);
  }
}
