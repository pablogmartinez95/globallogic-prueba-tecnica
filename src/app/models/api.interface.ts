export interface APIResponse {
    info: Info;
    results: CharacterAPI[];
}

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: null;
}

export interface CharacterAPI {
    id: number;
    name: string;
    status: Status;
    species: Species;
    gender: Gender;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
}

export interface Character {
    id: number;
    name: string;
    status: Status;
    species: Species;
    location: string;
    image: string;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
    Unknown = "unknown",
}

export interface Location {
    name: string;
    url: string;
}

export enum Species {
    Alien = "Alien",
    Human = "Human",
}

export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}
