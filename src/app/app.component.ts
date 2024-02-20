import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  refreshButton: boolean = true;
  alreadyUsedButton: boolean = false;

  constructor(private apiService: ApiService, private localStorageService: LocalStorageService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/') {
          this.refreshButton = false;
        } else {
          this.refreshButton = true;
        }
      }
    });
  }

  refreshAPIData(): void {
    this.alreadyUsedButton = true;
    this.localStorageService.removeItem('characters');
    this.apiService.fetchAPIData();

    setTimeout(() => {
      this.alreadyUsedButton = false;
    }, 5000);
  }

  navigateToCreateCharacter(): void {
    this.router.navigate(['character', 'create']);
  }
}
