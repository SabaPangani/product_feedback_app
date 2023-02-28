import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent {
  @Output() sortByWord = new EventEmitter<string>();

  /**
   *
   */

  assignSortStyle(value: string): void {
    this.sortByWord.emit(value);
  }
}
