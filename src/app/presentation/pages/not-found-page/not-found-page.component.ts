import { Component } from '@angular/core';
import { DraggableIconComponent } from "../../components/draggable-icon/draggable-icon.component";

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [DraggableIconComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent {
}