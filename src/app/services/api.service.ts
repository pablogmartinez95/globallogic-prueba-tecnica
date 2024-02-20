import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, Character, CharacterAPI } from '../models/api.interface';
import { BehaviorSubject, map, shareReplay, take } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private characters = new BehaviorSubject<Character[]>([]);
  public characters$ = this.characters.asObservable();

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    if (localStorageService.getItem('characters')) {
      this.characters.next(JSON.parse(localStorageService.getItem('characters') || ''));
    } else {
      this.fetchAPIData();
    }
  }

  public fetchAPIData(): void {
    this.http.get<APIResponse>('https://rickandmortyapi.com/api/character').pipe(
      map((data: APIResponse) => {
        return data.results;
      }),
      map((characters: CharacterAPI[]) => {
        const cleanCharacters: Character[] = [];

        for (const character of characters) {
          cleanCharacters.push({
            id: character.id,
            name: character.name,
            status: character.status,
            species: character.species,
            location: character.location.name,
            image: character.image
          });
        }

        return cleanCharacters;
      })
    ).subscribe((characters: Character[]) => this.characters.next(characters));
  }

  public createCharacter(character: Character): void {
    const currentValue = this.characters.getValue();

    character.id = currentValue[currentValue.length - 1].id + 1;

    const updatedValue = [...currentValue, character];
    this.characters.next(updatedValue);
    this.localStorageService.setItem('characters', JSON.stringify(updatedValue));
  }

  public readCharacter(id: number): Character | undefined {
    const currentValue = this.characters.getValue();
    return currentValue.find((character) => character.id === id);
  }

  public updateCharacter(newCharacter: Character): void {
    const currentValue = this.characters.getValue();
    const index = currentValue.findIndex((previousCharacter) => previousCharacter.id === newCharacter.id);
    const updatedValue = [...currentValue];

    updatedValue[index] = newCharacter;
    this.characters.next(updatedValue);
    this.localStorageService.setItem('characters', JSON.stringify(updatedValue));
  }

  public deleteCharacter(id: number): void {
    const currentValue = this.characters.getValue();
    const updatedValue = currentValue.filter((character) => character.id !== id);
    this.characters.next(updatedValue);
    this.localStorageService.setItem('characters', JSON.stringify(updatedValue));
  }
}
