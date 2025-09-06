import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
  @Input() index!: number;
  @Output() remove = new EventEmitter<number>();
  response = signal<string>('');
  IsInvalid = signal(false);

  IsValid = (): boolean => 
    !!this.response().trim();

  ClearAll = () => {
    this.response.set('');
  }

  MarkInvalid = () : void => 
    this.IsInvalid.set(!this.IsValid());

  UpdateTextResponse = (event: Event) : void => {
    const input = event.target as HTMLInputElement;
    this.response.set(input.value.trim());
  }

  RemoveResponse = () : void => 
    this.remove.emit(this.index);
}