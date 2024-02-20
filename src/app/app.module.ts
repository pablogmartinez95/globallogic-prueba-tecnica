import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterStatusComponent } from './components/character-status/character-status.component';
import { MaterialModule } from './material.module';
import { CharacterComponent } from './pages/character/character.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrokenImageDirective } from './directives/broken-image.directive';
import { Router, provideRouter } from '@angular/router';
import { ApiService } from './services/api.service';
import { take } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharacterComponent,
    CharacterCardComponent,
    CharacterStatusComponent,
    DeleteDialogComponent,
    BrokenImageDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes), provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ApiService) => {
        return () => {
          return config.characters$.pipe(take(1));
        };
      },
      multi: true,
      deps: [ApiService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export function initializeAppDynamicRouting(router: Router, apiService: ApiService,): () => Promise<void> {
//   return () =>
//     new Promise((resolve) => {

//       if (apiService.readCharacter(0)) {

//         router.resetConfig([
//           ...routes,
//           {
//             path: '',
//             component: HomeComponent,
//           },
//         ]);
//       }
//       else {
//         router.resetConfig([
//           ...routes,
//           {
//             path: '',
//             component: HomeComponent,
//           },
//         ]);
//       }

//       resolve();
//     });
// }
