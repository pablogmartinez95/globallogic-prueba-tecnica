import { Component, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Character } from '../../models/api.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  public characterSuscription!: Subscription;
  public characters: Character[] = [];

  constructor(private apiService: ApiService) {
    this.characterSuscription = this.apiService.characters$.subscribe((characters) => {
      this.characters = characters;
      console.log(this.characters);
    });
  }

  ngOnDestroy(): void {
    this.characterSuscription.unsubscribe();
  }
}
