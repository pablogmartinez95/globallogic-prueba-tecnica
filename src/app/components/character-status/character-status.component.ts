import { Component, Input } from '@angular/core';
import { Status } from '../../models/api.interface';

@Component({
  selector: 'app-character-status',
  template: `
    <article class="character-status">
      <div class="status" [ngClass]="{'alive': status === 'Alive', 'dead': status === 'Dead', 'unknown': status === 'unknown'}"></div>
      <span style="font-weight: 700;">
        <ng-content></ng-content>
      </span>
    </article>
  `,
  styles: `
  .character-status {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status {
    width: 8px;
    height: 8px;
    border-radius: 50%;

    &.alive {
      background-color: green;
    }

    &.dead {
      background-color: red;
    }

    &.unknown {
      background-color: grey;
    }
  }
  `
})
export class CharacterStatusComponent {
  @Input() status: Status = Status.Unknown;
}
